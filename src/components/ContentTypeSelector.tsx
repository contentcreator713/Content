"use client";
import type { ContentType, Platform } from "@/lib/types";

interface ContentTypeOption {
  id: ContentType;
  label: string;
  icon: string;
  platforms: Platform[];
}

const options: ContentTypeOption[] = [
  { id: "hook", label: "Hook", icon: "🪝", platforms: ["tiktok", "youtube"] },
  { id: "script", label: "Script", icon: "📜", platforms: ["tiktok", "youtube"] },
  { id: "description", label: "Description", icon: "📝", platforms: ["tiktok", "youtube"] },
  { id: "title", label: "Title", icon: "🏷️", platforms: ["youtube"] },
];

interface Props {
  value: ContentType;
  platform: Platform;
  onChange: (t: ContentType) => void;
}

export default function ContentTypeSelector({ value, platform, onChange }: Props) {
  const available = options.filter((o) => o.platforms.includes(platform));
  return (
    <div className="flex flex-wrap gap-2">
      {available.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            value === o.id
              ? "bg-purple-600/20 border-purple-500 text-purple-300"
              : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
          }`}
        >
          <span>{o.icon}</span>
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
