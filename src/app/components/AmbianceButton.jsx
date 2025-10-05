import React, { useState } from "react";
import { CloudRain, CloudLightning, Wind, Waves } from "@phosphor-icons/react";
import VolumeBar from "./VolumeBar";

const icon = {
  Rain: CloudRain,
  Storm: CloudLightning,
  Wind: Wind,
  Waves: Waves,
};

const AmbianceButton = ({ ambiance }) => {
  const [isActive, setIsActive] = useState(false);
  const IconImage = icon[ambiance];

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <button
      className="flex items-center flex-col p-6 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2"
      onClick={handleToggle}
    >
      <div
        className={`flex justify-center rounded-full p-2 ${
          isActive ? `bg-gray-600` : `bg-indigo-400`
        }`}
      >
        <IconImage size={48} weight="regular" />
      </div>
      <span className="font-bold">{ambiance}</span>
      <VolumeBar />
    </button>
  );
};

export default AmbianceButton;
