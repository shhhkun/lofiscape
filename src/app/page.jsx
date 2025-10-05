"use client";
import React from "react";
import AmbianceButton from "./components/AmbianceButton";

const AmbianceSounds = [
  { name: "Rain", fileUrl: "/rain.m4a" },
  { name: "Storm", fileUrl: "/storm.m4a" },
  { name: "Wind", fileUrl: "/wind.m4a" },
  { name: "Waves", fileUrl: "/wind.m4a" },
  { name: "Campfire", fileUrl: "/wind.m4a" },
];

export default function HomePage() {
  return (
    <div>
      <main className="flex flex-col min-h-dvh bg-[url('/bg.jpg')] bg-cover bg-top justify-between">

        <div className="flex justify-center bg-[var(--card-bg)] backdrop-blur-xs p-6 my-6 mx-auto rounded-lg">
          <h1 className="text-4xl font-extrabold">Create Your Focus Scape</h1>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex bg-[var(--card-bg)] backdrop-blur-xs py-6 px-24 m-6 rounded-lg gap-6">
            <div className="flex flex-row flex-wrap gap-4">
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
