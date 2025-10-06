import React from "react";
import VolumeBar from "./VolumeBar";
import { SpeakerSimpleHighIcon } from "@phosphor-icons/react";

const TrackSelection = () => {
  return (
    <div className="flex flex-row w-full items-center gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-bold">LoFi Track:</p>
        <select className="text-[var(--text2)] bg-[var(--accent)] font-bold p-2 rounded-lg">
          <option>Currently Playing...</option>
          <option>Currently Playing...</option>
          <option>Currently Playing...</option>
        </select>
      </div>
      <div className="flex flex-row flex-1 gap-4">
        <SpeakerSimpleHighIcon size={24} weight="bold" />
        <VolumeBar />
      </div>
    </div>
  );
};

export default TrackSelection;
