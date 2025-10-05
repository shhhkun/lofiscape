"use client";
import React from "react";
import AmbianceButton from "./components/AmbianceButton";

export default function HomePage() {
  return (
    <div>
      <main className="flex min-h-dvh items-center justify-center">
        <div
          className="flex flex-col items-center p-6 rounded-lg gap-6"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <h1 className="text-4xl font-extrabold">Create Your Focus Scape</h1>

          <div className="flex flex-row flex-wrap gap-4">
            <AmbianceButton ambiance={"Rain"} />
            <AmbianceButton ambiance={"Storm"} />
            <AmbianceButton ambiance={"Wind"} />
            <AmbianceButton ambiance={"Waves"} />
            <AmbianceButton ambiance={"Campfire"} />
          </div>
        </div>
      </main>
    </div>
  );
}
