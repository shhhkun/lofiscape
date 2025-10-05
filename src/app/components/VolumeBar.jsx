import React from "react";

export default function VolumeBar() {

  return (
    <div className="flex items-center w-full py-2">
      {/* Slider bar with circle */}
      <input
        type="range"
        min="0"
        max="100"
        // Use defaultValue for a static snippet, or 'value' for controlled components
        defaultValue="50"
        onClick={(e) => e.stopPropagation()} // prevent interference with 
        className="
                    flex-grow h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer 
                    transition-all duration-300

                    /* --- Webkit (Chrome, Safari) Thumb Styling --- */
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:bg-indigo-400 /* Accent Color for the Circle */
                    [&::-webkit-slider-thumb]:ring-2
                    [&::-webkit-slider-thumb]:ring-offset-2
                    [&::-webkit-slider-thumb]:ring-indigo-400
                    [&::-webkit-slider-thumb]:ring-offset-gray-800
                    [&::-webkit-slider-thumb]:transition-colors

                    /* --- Firefox Thumb Styling --- */
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-none
                    [&::-moz-range-thumb]:bg-indigo-400 /* Accent Color for the Circle */
                    "
      />
    </div>
  );
}
