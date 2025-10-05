import React from "react";

export default function VolumeBar({ volume, onVolumeChange }) {
  return (
    <div className="flex items-center py-2">
      {/* Slider bar with circle */}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onVolumeChange}
        onClick={(e) => e.stopPropagation()} // prevent interference with button
        className="
                    flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer 
                    transition-all duration-300

                    /* --- Webkit (Chrome, Safari) Thumb Styling --- */
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:w-5 
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-indigo-400 /* Accent Color for the Circle */
                    [&::-webkit-slider-thumb]:transition-colors

                    /* --- Firefox Thumb Styling --- */
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-indigo-400 /* Accent Color for the Circle */
                    "
      />
    </div>
  );
}
