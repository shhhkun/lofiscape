"use client";
import React from "react";
import { CloudRain, CloudLightning, Wind, Waves } from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <div>
      <main className="flex min-h-dvh items-center justify-center">
        <div
          className="flex flex-col items-center p-6 rounded-lg gap-6"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <h1 className="text-4xl font-bold">Create Your Focus Scape</h1>

          <div className="flex flex-row flex-wrap gap-4">
            <button className="flex items-center flex-col py-4 px-8 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2">
              <CloudRain size={48} weight="regular" />
              <span className="font-bold">Rain</span>
            </button>
            <button className="flex items-center flex-col py-4 px-8 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2">
              <CloudLightning size={48} weight="regular" />
              <span className="font-bold">Storm</span>
            </button>
            <button className="flex items-center flex-col py-4 px-8 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2">
              <Wind size={48} weight="regular" />
              <span className="font-bold">Wind</span>
            </button>
            <button className="flex items-center flex-col py-4 px-8 bg-[var(--button-bg)] hover:bg-[var(--hover)] rounded-lg gap-2">
              <Waves size={48} weight="regular" />
              <span className="font-bold">Waves</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
