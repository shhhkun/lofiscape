import React, { useRef, useEffect, useState } from "react";

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";

// global queue for API Ready Callbacks
window.youtubeApiReadyCallbacks = window.youtubeApiReadyCallbacks || [];

/**
 * Loads the YouTube IFrame Player API script only once
 * @returns {boolean} true if the YT object is available/loaded
 */
const useYouTubeScriptLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Handler function for when the API script finishes loading
    const handleAPILoaded = () => {
      // check for the constructor function for absolute certainty
      if (typeof window.YT?.Player === "function") {
        setIsLoaded(true);
      }
    };

    // 2. Check if the API is already defined (e.g., from a prior mount: YT.Player exists)
    if (typeof window.YT?.Player === "function") {
      setIsLoaded(true);
      return;
    }

    // 3. Register our component's ready handler into the global queue
    window.youtubeApiReadyCallbacks.push(handleAPILoaded);

    // 4. Define the global YouTube callback function (if it doesn't exist)
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        // when the API loads, iterate through all queued callbacks and run them
        while (window.youtubeApiReadyCallbacks.length > 0) {
          const callback = window.youtubeApiReadyCallbacks.shift();
          callback();
        }
      };
    }

    // 5. Load the script only if it's not already loading
    if (!document.querySelector(`script[src="${YOUTUBE_API_URL}"]`)) {
      const tag = document.createElement("script");
      tag.src = YOUTUBE_API_URL;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // cleanup: remove this component's handler from the queue on unmount
    return () => {
      const index = window.youtubeApiReadyCallbacks.indexOf(handleAPILoaded);
      if (index > -1) {
        window.youtubeApiReadyCallbacks.splice(index, 1);
      }
    };
  }, []);

  return isLoaded;
};

const YouTubePlayer = ({ videoId, volume, isMuted, isActive }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const isAPILoaded = useYouTubeScriptLoader(); // tracks if the API is ready

  // 1. Initialization Effect: ONLY depends on API and videoId
  useEffect(() => {
    if (!isAPILoaded || playerRef.current) return;

    const initializePlayer = () => {
      if (!window.YT) return;

      const currentOrigin = window.location.origin;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          fs: 0,
          origin: currentOrigin, // for localhost stability
        },
        events: {
          onReady: (event) => {
            console.log("YouTube Player Ready.");
            // apply initial props immediately on ready
            event.target.setVolume(volume);
            if (isMuted) event.target.mute();
            else event.target.unMute();
            // autoplay requires user interaction, but command it anyway
            if (isActive) event.target.playVideo();
            else event.target.pauseVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    initializePlayer();

    // cleanup on unmount
    return () => {
      if (playerRef.current) {
        if (typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
        }
        playerRef.current = null;
      }
    };
  }, [isAPILoaded, videoId]);

  // 2. Prop Synchronization Effects (only run if the player exists)

  // hook for videoId change (loads new track)
  useEffect(() => {
    if (
      playerRef.current &&
      playerRef.current.loadVideoById &&
      playerRef.current.getVideoData().video_id !== videoId
    ) {
      console.log("YouTubePlayer: Loading new video:", videoId);
      playerRef.current.loadVideoById({
        videoId: videoId,
        startSeconds: 0,
      });
    }
  }, [videoId]);

  // hook for isActive change (play/pause toggle)
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.playVideo) return;

    const playerState = playerRef.current.getPlayerState();

    if (isActive) {
      if (playerState !== window.YT.PlayerState.PLAYING) {
        playerRef.current.playVideo();
      }
    } else {
      if (playerState === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      }
    }
  }, [isActive]);

  // hook for volume and mute state changes
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.setVolume) return;

    playerRef.current.setVolume(volume);

    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  }, [volume, isMuted]);

  return <div ref={containerRef} style={{ display: "none" }} />;
};

export default YouTubePlayer;
