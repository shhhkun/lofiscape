import React, { useRef, useEffect, useState } from "react";

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";

/**
 * Loads the YouTube IFrame Player API script only once
 * @returns {boolean} true if the YT object is available/loaded
 */
const useYouTubeScriptLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. If YT is already defined (e.g., from a prior mount), it's ready
    if (window.YT) {
      setIsLoaded(true);
      return;
    }

    // 2. Define the global callback before inserting the script
    window.onYouTubeIframeAPIReady = () => {
      setIsLoaded(true);
    };

    // 3. Load the script only if it's not already loading
    if (!document.querySelector(`script[src="${YOUTUBE_API_URL}"]`)) {
      const tag = document.createElement("script");
      tag.src = YOUTUBE_API_URL;
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // No cleanup needed (loaded once globally)
    return () => {};
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
