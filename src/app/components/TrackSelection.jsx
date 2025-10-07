import React, { useState, useCallback } from "react";
import PlayButton from "./PlayButton";
import VolumeBar from "./VolumeBar";
import YouTubePlayer from "./YoutubePlayer";
import TrackDropdown from "./TrackDropdown";
import {
  SpeakerSimpleHighIcon,
  SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";

// song to youtube ID mappings
const videoMap = {
  song1: "OO2kPK5-qno",
  song2: "X2V0ag9mCjc",
  song3: "OO2kPK5-qno",
};

const TrackSelection = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50); // 0 to 100
  const [selectedTrack, setSelectedTrack] = useState("song1");

  const handleMute = useCallback(() => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
  }, [isMuted]);

  const handlePlay = useCallback(() => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
  }, [isActive]);

  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = parseInt(e.target.value, 10);
      setVolume(newVolume);
    },
    [isMuted]
  );

  const handleTrackChange = useCallback((e) => {
    setSelectedTrack(e.target.value);
  }, []);

  return (
    <>
      <YouTubePlayer
        videoId={videoMap[selectedTrack]}
        volume={volume}
        isMuted={isMuted}
        isActive={isActive}
      />

      <div className="flex flex-row items-center w-full lg:w-140 bg-[var(--button-bg)] p-4 rounded-lg gap-4">
        <PlayButton isActive={isActive} onPlay={handlePlay} />
        <div className="flex flex-row w-full items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-bold ">LoFi Track:</p>
            <TrackDropdown
              selectedTrack={selectedTrack}
              onTrackChange={handleTrackChange}
              tracks={videoMap}
            />
          </div>

          <div className="flex flex-row flex-1 gap-4">
            <button
              className="transition-transform duration-300 transform hover:scale-110"
              onClick={handleMute}
            >
              {isMuted ? (
                <SpeakerSimpleSlashIcon size={24} weight="bold" />
              ) : (
                <SpeakerSimpleHighIcon size={24} weight="bold" />
              )}
            </button>
            <VolumeBar volume={volume} onVolumeChange={handleVolumeChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackSelection;
