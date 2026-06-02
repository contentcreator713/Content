"use client";
import type { ContentType, GenerateRequest, Platform } from "@/lib/types";

interface Props {
  platform: Platform;
  contentType: ContentType;
  onGenerate: (output: string) => void;
  onLoading: (v: boolean) => void;
  loading: boolean;
}

const TONES = ["Energetic", "Casual", "Educational", "Inspirational", "Humorous", "Professional", "Conversational"];

const DURATIONS: Record<Platform, string[]> = {
  tiktok: ["15 seconds", "30 seconds", "60 seconds", "3 minutes"],
  youtube: ["1 minute (Short)", "5 minutes", "10 minutes", "20+ minutes"],
};

export default function AIGeneratorForm({ platform, contentType, onGenerate, onLoading, loading }: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body: GenerateRequest = {
      platform,
      contentType,
      topic: fd.get("topic") as string,
      tone: fd.get("tone") as string,
      targetAudience: fd.get("targetAudience") as string,
      duration: fd.get("duration") as string,
      keywords: fd.get("keywords") as string,
      extraContext: fd.get("extraContext") as string,
    };

    onLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onGenerate(data.content);
    } catch (err) {
      onGenerate(`Error: ${err instanceof Error ? err.message : "Something went wrong."}`);
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">
          Topic / Idea <span className="text-purple-400">*</span>
        </label>
        <input
          name="topic"
          required
          placeholder={`e.g. ${platform === "tiktok" ? "5-minute morning routine that changed my life" : "How I grew my YouTube channel to 10k subscribers"}`}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Tone</label>
          <select
            name="tone"
            defaultValue="Energetic"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
          >
            {TONES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Duration</label>
          <select
            name="duration"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
          >
            {DURATIONS[platform].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">Target Audience <span className="text-purple-400">*</span></label>
        <input
          name="targetAudience"
          required
          placeholder="e.g. beginner content creators aged 18-25"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">Keywords (optional)</label>
        <input
          name="keywords"
          placeholder="e.g. content creation, social media, growth"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">Extra context (optional)</label>
        <textarea
          name="extraContext"
          rows={2}
          placeholder="Any specific points to include, your niche, brand voice notes…"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-purple-900/30"
      >
        {loading ? "Generating…" : "✨ Generate with AI"}
      </button>
    </form>
  );
}
