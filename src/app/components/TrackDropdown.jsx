import React, { useState, useRef, useEffect } from "react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";

const TrackDropdown = ({ selectedTrack, onTrackChange, tracks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // current track name for display
  const currentTrack = selectedTrack || "Select Track";

  // hook for outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Mimic the native event object structure for existing handler
  const handleSelect = (key) => {
    onTrackChange({ target: { value: key } });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-44 font-bold p-2 rounded-lg
                   bg-[var(--accent)] text-[var(--text2)]"
      >
        <span className="flex-shrink-0">{currentTrack}</span>
        <CaretDownIcon
          size={16}
          weight="bold"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full mb-4 left-0 w-44 p-2 rounded-xl"
          style={{
            backgroundColor: "var(--button-bg)",
            border: `2px solid var(--accent)`,
            animation: "fade-in 0.3s ease-out forwards", // fade-in grow animation
          }}
        >
          {/* keyframe definition for the fade-in effect */}
          <style jsx="true">{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(0);
              }
              to {
                opacity: 1;
                transform: translateY(-10px);
              }
            }
          `}</style>

          {Object.keys(tracks).map((key) => (
            <div
              key={key}
              onClick={() => handleSelect(key)}
              className="flex items-center p-2 rounded-lg cursor-pointer transition duration-150 hover:bg-[var(--hover)]"
            >
              <span className="font-bold flex-shrink-0">{key}</span>

              {/* checkmark indicator */}
              {key === selectedTrack && (
                <CheckIcon size={18} weight="bold" className="ml-auto" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackDropdown;
