import React, { useState, useEffect, useRef } from "react";
import { SunIcon, CheckIcon } from "@phosphor-icons/react";

const THEMES = [
  {
    key: "green-theme",
    label: "Deep Green",
  },
  {
    key: "cloud-theme",
    label: "Cloud Light",
  },
  {
    key: "night-theme",
    label: "Night",
  },
];

const ThemeButton = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleThemeChange = (newThemeKey) => {
    setTheme(newThemeKey);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 flex-shrink-0
                   text-[var(--accent)]
                   bg-[var(--card-bg)] rounded-full"
      >
        <div className="transition-transform duration-300 transform hover:scale-110">
          <SunIcon size={32} weight="bold" />
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-4 left-0 w-44 p-2 rounded-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            border: `2px solid var(--accent)`,
            animation: "fade-in 0.3s ease-out forwards", // fade-in grow animation
          }}
        >
          {/* keyframe definition for the fade-in effect */}
          <style jsx="true">{`
            @keyframes fade-in {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {THEMES.map((themeOption) => (
            <div
              className="flex items-center font-bold p-2 rounded-lg cursor-pointer transition duration-200 text-[var(--text)] hover:bg-[var(--hover)]"
              key={themeOption.key}
              onClick={() => handleThemeChange(themeOption.key)}
            >
              <span className="ml-2 text-[var(--accent)]">
                {themeOption.label}
              </span>

              {/* checkmark indicator */}
              {themeOption.key === theme && (
                <CheckIcon
                  size={18}
                  weight="bold"
                  className="ml-auto text-[var(--accent)]"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeButton;
