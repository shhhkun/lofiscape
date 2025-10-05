import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CloudRainIcon,
  CloudLightningIcon,
  WindIcon,
  WavesIcon,
  CampfireIcon,
} from "@phosphor-icons/react";
import VolumeBar from "./VolumeBar";
import CrossfadeAmbiancePlayer from "./CrossfadeAmbiancePlayer";

const icon = {
  Rain: CloudRainIcon,
  Storm: CloudLightningIcon,
  Wind: WindIcon,
  Waves: WavesIcon,
  Campfire: CampfireIcon,
};

const AmbianceButton = ({ ambiance, audioUrl }) => {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(50); // 0 to 100

  const IconImage = icon[ambiance];
  //   const audioRef = useRef(null);

  //   // audio initialization
  //   useEffect(() => {
  //     if (!audioRef.current) {
  //       audioRef.current = new Audio(audioUrl); // create audio element on mount
  //       audioRef.current.loop = true; // start loop
  //       audioRef.current.volume = 0; // initially 0
  //     }

  //     // cleanup on umount
  //     return () => {
  //       if (audioRef.current) {
  //         audioRef.current.pause();
  //         audioRef.current = null;
  //       }
  //     };
  //   }, [audioUrl]);

  //   // handler sound on/off
  //   const handleToggle = () => {
  //     const newIsActive = !isActive; // immediately get next state
  //     setIsActive(newIsActive); // queue state

  //     // play
  //     if (newIsActive) {
  //       if (audioRef.current) {
  //         audioRef.current.volume = volume / 100;
  //         audioRef.current
  //           .play()
  //           .catch((e) => console.error(`Error playing ${ambiance}:`, e));
  //       }
  //     }
  //     // pause
  //     else {
  //       if (audioRef.current) {
  //         audioRef.current.pause();
  //       }
  //     }
  //   };

  //   const handleVolumeChange = (e) => {
  //     // stop the event from bubbling up to the parent <button>
  //     e.stopPropagation();

  //     const newVolume = parseInt(e.target.value, 10);
  //     setVolume(newVolume);

  //     if (audioRef.current) {
  //       audioRef.current.volume = newVolume / 100;
  //     }
  //   };

  // handler sound on/off
  const handleToggle = useCallback(() => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
  }, [isActive]);

  const handleVolumeChange = useCallback(
    (e) => {
      // stop the event from bubbling up to the parent <button>
      e.stopPropagation();

      const newVolume = parseInt(e.target.value, 10);
      setVolume(newVolume);
    },
    [isActive]
  );

  return (
    <>
      <CrossfadeAmbiancePlayer
        audioUrl={audioUrl}
        volume={volume}
        isActive={isActive}
      />
      <button
        className="flex items-center flex-col p-6 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2"
        onClick={handleToggle}
      >
        <div
          className={`flex justify-center rounded-full p-2 ${
            isActive ? `bg-indigo-400` : `bg-gray-600`
          }`}
        >
          <IconImage size={48} weight="regular" />
        </div>
        <span className="font-bold">{ambiance}</span>
        <VolumeBar volume={volume} onVolumeChange={handleVolumeChange} />
      </button>
    </>
  );
};

export default AmbianceButton;
