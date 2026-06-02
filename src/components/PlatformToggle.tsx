"use client";
import type { Platform } from "@/lib/types";

interface Props {
  value: Platform;
  onChange: (p: Platform) => void;
}

const platforms = [
  { id: "tiktok" as Platform, label: "TikTok", emoji: "🎵" },
  { id: "youtube" as Platform, label: "YouTube", emoji: "▶️" },
];

export default function PlatformToggle({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 p-1 bg-gray-900 rounded-xl border border-gray-800">
      {platforms.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            value === p.id
              ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          }`}
        >
          <span>{p.emoji}</span>
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
