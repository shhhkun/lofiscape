import React from "react";
import VolumeBar from "./VolumeBar";

const TrackSelection = () => {
  return (
    <div className="flex flex-col flex-1 min-w-0 gap-2">
      <p className="font-bold">LoFi Track:</p>
      <select className="bg-indigo-400 font-bold w-full pl-2 pr-32 py-2 rounded-lg">
        <option>Currently Playing...</option>
        <option>Currently Playing...</option>
        <option>Currently Playing...</option>
      </select>
      <VolumeBar />
    </div>
  );
};

export default TrackSelection;
