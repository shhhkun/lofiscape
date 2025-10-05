import React, { useState } from "react";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";

const PlayButton = ({}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <button
      className="flex w-12 h-12 items-center justify-center bg-indigo-400 p-2 rounded-full"
      onClick={handleToggle}
    >
      {isActive ? (
        <PauseIcon size={24} weight="bold" />
      ) : (
        <PlayIcon size={24} weight="bold" />
      )}
    </button>
  );
};

export default PlayButton;
