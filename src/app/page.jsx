"use client";
import React from "react";
import AmbianceButton from "./components/AmbianceButton";
import PlayButton from "./components/PlayButton";
import TrackSelection from "./components/TrackSelection";

const AmbianceSounds = [
  { name: "Rain", fileUrl: "/rain.m4a" },
  { name: "Storm", fileUrl: "/storm.m4a" },
  { name: "Wind", fileUrl: "/wind.m4a" },
  { name: "Waves", fileUrl: "/waves.m4a" },
  { name: "Campfire", fileUrl: "/campfire.m4a" },
  { name: "Coffee Shop", fileUrl: "/coffeeshop.m4a" },
];

export default function HomePage() {
  return (
    <div>
      <main className="flex min-h-dvh bg-[url('/bg.jpg')] bg-cover bg-top">
        <div className="flex w-full justify-center mt-auto">
          <div className="flex flex-row flex-wrap justify-center w-full items-center bg-[var(--card-bg)] backdrop-blur-xs py-6 px-6 gap-6">
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
