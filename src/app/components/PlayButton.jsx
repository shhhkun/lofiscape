import React from "react";
import { PlayIcon, PauseIcon } from "@phosphor-icons/react";

const PlayButton = ({ isActive, onPlay }) => {
  return (
    <button
      className="flex w-12 h-12 items-center justify-center text-[var(--text2)] bg-[var(--accent)] p-2 rounded-full flex-shrink-0
                 transition-transform duration-300 transform hover:scale-110"
      onClick={onPlay}
    >
      {isActive ? (
        <PauseIcon size={24} weight="fill" />
      ) : (
        <PlayIcon size={24} weight="fill" />
      )}
    </button>
  );
};

export default PlayButton;
