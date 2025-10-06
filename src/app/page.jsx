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
];

export default function HomePage() {
  return (
    <div>
      <main className="flex min-h-dvh bg-[url('/bg.jpg')] bg-cover bg-top">
        {/* <div className="flex justify-center bg-[var(--card-bg)] backdrop-blur-xs p-6 my-6 mx-auto rounded-lg">
          <h1 className="text-4xl font-extrabold">Create Your Focus Scape</h1>
        </div> */}

        <div className="flex w-full justify-center mt-auto">
          <div className="flex flex-row flex-wrap w-full items-center bg-[var(--card-bg)] backdrop-blur-xs py-6 px-6 justify-between gap-6">
            <div className="flex flex-row items-center w-full lg:w-120 bg-[var(--button-bg)] p-4 rounded-lg gap-4">
              <PlayButton />
              <TrackSelection />
            </div>

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
