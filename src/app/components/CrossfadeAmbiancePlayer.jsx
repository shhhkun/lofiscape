import React, { useEffect, useRef, useCallback } from "react";

const FADE_TIME = 0.5; // crossfade duration in seconds

const useAudioCrossfade = (audioUrl, volume, isActive) => {
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const playersRef = useRef([null, null]); // [player1, player2]
  const isReadyRef = useRef(false);
  const currentVolumeRef = useRef(volume); // ref for current volume prop value
  const isActiveRef = useRef(isActive); // ref for current isActive prop value

  // update the ref whenever the volume prop changes
  useEffect(() => {
    currentVolumeRef.current = volume;
    isActiveRef.current = isActive;
  }, [volume, isActive]);

  // 1) Initialize audio loading
  useEffect(() => {
    // initialize Audio Context on first component mount
    const context = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = context;

    const fetchAndDecodeAudio = async () => {
      try {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;
        isReadyRef.current = true;
        console.log(`Audio buffer loaded for: ${audioUrl}`);
      } catch (error) {
        console.error("Error loading or decoding audio:", error);
      }
    };

    fetchAndDecodeAudio();

    // cleanup function
    return () => {
      // manually stop and disconnect any running sources
      playersRef.current.forEach((player, index) => {
        if (player && player.source) {
          try {
            player.source.stop();
            player.source.disconnect();
            player.gainNode.disconnect();
            playersRef.current[index] = null;
          } catch (e) {
            // safely ignore errors on sources that might have already stopped
          }
        }
      });
      playersRef.current = [null, null]; // reset the player refs array
      if (context.state !== "closed") {
        context
          .close()
          .catch((e) => console.error("Error closing AudioContext:", e));
      }
    };
  }, [audioUrl]);

  // 2) Looping & scheduling logic
  const startPlayer = useCallback((playerIndex, startTime) => {
    const context = audioContextRef.current;
    const buffer = audioBufferRef.current;
    if (!context || !buffer || !isReadyRef.current) return;

    // read the current target volume directly from the ref
    const freshTargetVolume = currentVolumeRef.current / 100;

    // create source and gain node
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = false; // manual looping

    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0.0001, context.currentTime); // start near zero
    gainNode.connect(context.destination);
    source.connect(gainNode);

    // store in refs
    playersRef.current[playerIndex] = { source, gainNode };

    // determine when to schedule the next loop (crossfade point)
    const bufferDuration = buffer.duration;

    // schedule the next player to start just before the current one ends
    const triggerTime = startTime + bufferDuration - FADE_TIME;

    // AudioContext scheduling via setTimeout
    // (in a real application, use a Web Worker or a precise scheduling loop)
    const timeoutId = setTimeout(() => {
      if (!isActiveRef.current || context.state !== "running") return;

      const nextIndex = 1 - playerIndex;
      const fadeStart = context.currentTime;
      const fadeEnd = fadeStart + FADE_TIME;

      // re-read the fresh volume inside the timeout before scheduling the next player
      const scheduleTargetVolume = currentVolumeRef.current / 100;

      // a. start the NEXT player immediately, scheduling the next crossfade
      // pass the current volume for the new player to ramp up to
      startPlayer(nextIndex, fadeStart);

      // b. fade OUT the current player
      gainNode.gain.cancelScheduledValues(fadeStart);
      gainNode.gain.linearRampToValueAtTime(scheduleTargetVolume, fadeStart);
      gainNode.gain.linearRampToValueAtTime(0.0001, fadeEnd);

      // c. fade IN the next player
      const nextPlayer = playersRef.current[nextIndex];
      nextPlayer.gainNode.gain.cancelScheduledValues(fadeStart);
      nextPlayer.gainNode.gain.linearRampToValueAtTime(0.0001, fadeStart);
      nextPlayer.gainNode.gain.linearRampToValueAtTime(
        scheduleTargetVolume,
        fadeEnd
      );

      // d. clean up the current player & stop after fade is complete
      setTimeout(() => {
        source.stop();
        source.disconnect();
        gainNode.disconnect();
        playersRef.current[playerIndex] = null; // clear old player reference
      }, FADE_TIME * 1000 + 50); // small buffer time for cleanup
    }, (bufferDuration - FADE_TIME) * 1000);

    source.onended = () => clearTimeout(timeoutId);
    source.start(startTime);

    // e. fade in the player being started
    gainNode.gain.linearRampToValueAtTime(
      freshTargetVolume,
      startTime + FADE_TIME
    );
  }, []);

  // 3) Control: play, pause, volume
  useEffect(() => {
    const context = audioContextRef.current;
    const targetVolume = volume / 100;

    if (isActive && isReadyRef.current) {
      // start playback
      if (context.state !== "running") {
        context
          .resume()
          .catch((e) => console.error("Failed to resume context:", e));
      }

      // if no players are running, start the first one
      if (!playersRef.current[0] && !playersRef.current[1]) {
        // start first player with initial volume ramp up
        startPlayer(0, context.currentTime, targetVolume);
      }
      // if players ARE running (e.g., volume change), update their volume
      else {
        playersRef.current.forEach((player) => {
          if (player && player.gainNode) {
            player.gainNode.gain.linearRampToValueAtTime(
              targetVolume,
              context.currentTime + 0.05
            );
          }
        });
      }
    } else if (!isActive && (playersRef.current[0] || playersRef.current[1])) {
      // stop playback
      const fadeEnd = context.currentTime + 0.2;

      playersRef.current.forEach((player) => {
        if (player && player.source) {
          player.gainNode.gain.cancelScheduledValues(context.currentTime);
          player.gainNode.gain.linearRampToValueAtTime(0.0001, fadeEnd); // Fade out

          setTimeout(() => {
            try {
              player.source.stop();
              player.source.disconnect();
              player.gainNode.disconnect();
            } catch (e) {}
          }, (fadeEnd - context.currentTime) * 1000 + 100);
        }
      });
      playersRef.current = [null, null]; // reset refs
    } else if (
      isActive &&
      isReadyRef.current &&
      (playersRef.current[0] || playersRef.current[1])
    ) {
      // volume change while active
      playersRef.current.forEach((player) => {
        if (player && player.gainNode) {
          player.gainNode.gain.cancelScheduledValues(context.currentTime); // cancel pending fades before setting new volume
          player.gainNode.gain.linearRampToValueAtTime(
            targetVolume,
            context.currentTime + 0.05
          );
        }
      });
    }
  }, [isActive, volume]);

  //return { isReady: isReadyRef.current };
};

const CrossfadeAmbiancePlayer = ({ audioUrl, volume, isActive }) => {
  useAudioCrossfade(audioUrl, volume, isActive);

  return null;
};

export default CrossfadeAmbiancePlayer;
