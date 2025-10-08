"use client";
import React, { useState, useEffect } from "react";
import AmbianceButton from "./components/AmbianceButton";
import TrackSelection from "./components/TrackSelection";
import ThemeButton from "./components/ThemeButton";

const AmbianceSounds = [
  { name: "Rain", fileUrl: "/rain.m4a" },
  { name: "Storm", fileUrl: "/storm.m4a" },
  { name: "Wind", fileUrl: "/wind.m4a" },
  { name: "Waves", fileUrl: "/waves.m4a" },
  { name: "Campfire", fileUrl: "/campfire.m4a" },
  { name: "Coffee Shop", fileUrl: "/coffeeshop.m4a" },
];

// function to apply the theme class to the document root
const applyThemeClass = (themeKey) => {
  const element = document.documentElement; // for <html>

  // remove existing theme classes
  element.classList.remove(
    "green-theme",
    "cloud-theme",
    "night-theme",
    "sunset-theme",
    "jade-theme",
    "jstreet-theme",
    "neon-theme"
  );

  // add the new theme class
  element.classList.add(themeKey);
};

export default function HomePage() {
  const [theme, setTheme] = useState("green-theme");

  // hook to detect theme changes
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  return (
    <div>
      <main className="flex flex-col min-h-dvh bg-[url('/bg.jpg')] bg-cover justify-between">
        <div className="m-6">
          <ThemeButton theme={theme} setTheme={setTheme} />
        </div>

        <div className="flex w-full justify-center mt-auto">
          <div className="flex flex-row flex-wrap justify-center w-full items-center bg-[var(--card-bg)] backdrop-blur-xs p-6 m-6 gap-6 rounded-xl">
            <TrackSelection />

            <div className="flex flex-row flex-wrap gap-6">
              {AmbianceSounds.map((sound) => (
                <AmbianceButton
                  key={sound.name}
                  ambiance={sound.name}
                  audioUrl={sound.fileUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
