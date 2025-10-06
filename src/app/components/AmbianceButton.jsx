import React, { useState, useCallback } from "react";
import {
  CloudRainIcon,
  CloudLightningIcon,
  WindIcon,
  WavesIcon,
  CampfireIcon,
  CoffeeIcon,
} from "@phosphor-icons/react";
import VolumeBar from "./VolumeBar";
import CrossfadeAmbiancePlayer from "./CrossfadeAmbiancePlayer";

const icon = {
  Rain: CloudRainIcon,
  Storm: CloudLightningIcon,
  Wind: WindIcon,
  Waves: WavesIcon,
  Campfire: CampfireIcon,
  "Coffee Shop": CoffeeIcon,
};

const AmbianceButton = ({ ambiance, audioUrl }) => {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(50); // 0 to 100

  const IconImage = icon[ambiance];

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
        className="flex items-center flex-col p-4 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2"
        onClick={handleToggle}
      >
        <div
          className={`flex justify-center rounded-full p-2 ${
            isActive ? `bg-[var(--accent)]` : `bg-[var(--accent2)]`
          } 
            transition-transform duration-300 transform hover:scale-110`}
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
