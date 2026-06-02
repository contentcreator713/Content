"use client";
import { useState } from "react";
import type { ContentType, Platform } from "@/lib/types";
import { getTemplates } from "@/lib/templates";
import PlatformToggle from "@/components/PlatformToggle";
import ContentTypeSelector from "@/components/ContentTypeSelector";
import AIGeneratorForm from "@/components/AIGeneratorForm";
import TemplateCard from "@/components/TemplateCard";
import OutputCard from "@/components/OutputCard";

type Mode = "ai" | "templates";

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [contentType, setContentType] = useState<ContentType>("hook");
  const [mode, setMode] = useState<Mode>("ai");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlatformChange = (p: Platform) => {
    setPlatform(p);
    if (p === "tiktok" && contentType === "title") setContentType("hook");
    setOutput("");
  };

  const templates = getTemplates(platform, contentType);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
              ✨
            </div>
            <span className="font-bold text-gray-100 text-lg tracking-tight">ContentCraft</span>
          </div>
          <p className="text-xs text-gray-500 hidden sm:block">TikTok & YouTube Content Studio</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Create{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              viral content
            </span>{" "}
            in seconds
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Generate hooks, scripts, titles, and descriptions for TikTok and YouTube — powered by AI or pre-built
            templates.
          </p>
        </div>

        {/* Platform + Content Type */}
        <div className="max-w-2xl mx-auto mb-8 flex flex-col gap-4">
          <PlatformToggle value={platform} onChange={handlePlatformChange} />
          <ContentTypeSelector value={contentType} platform={platform} onChange={(t) => { setContentType(t); setOutput(""); }} />
        </div>

        {/* Mode tabs */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-1 p-1 bg-gray-900 rounded-lg border border-gray-800 w-fit">
            {(["ai", "templates"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  mode === m ? "bg-gray-700 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {m === "ai" ? "✨ AI Generate" : "📋 Templates"}
              </button>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="max-w-2xl mx-auto flex flex-col gap-6 lg:max-w-6xl lg:grid lg:grid-cols-2">
          {/* Left panel */}
          <div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              {mode === "ai" ? (
                <>
                  <h2 className="text-sm font-semibold text-gray-300 mb-4">AI Content Generator</h2>
                  <AIGeneratorForm
                    platform={platform}
                    contentType={contentType}
                    onGenerate={setOutput}
                    onLoading={setLoading}
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  <h2 className="text-sm font-semibold text-gray-300 mb-4">
                    Templates — {platform === "tiktok" ? "TikTok" : "YouTube"}
                    <span className="ml-2 text-xs text-gray-600 font-normal">
                      ({templates.length} for {contentType})
                    </span>
                  </h2>
                  {templates.length === 0 ? (
                    <p className="text-sm text-gray-600 text-center py-8">
                      No templates for this combination yet. Try a different content type.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {templates.map((t) => (
                        <TemplateCard key={t.id} template={t} onUse={setOutput} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right panel — Output */}
          <div className="flex flex-col gap-4">
            <OutputCard content={output} loading={loading} />

            {/* Tips */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                {platform === "tiktok" ? "TikTok" : "YouTube"} Tips
              </h3>
              {platform === "tiktok" ? (
                <ul className="text-xs text-gray-500 flex flex-col gap-1.5 list-none">
                  <li>🪝 Hook in the first 1-2 seconds or viewers scroll past</li>
                  <li>📊 3-5 hashtags outperform 10+ on TikTok</li>
                  <li>🔁 Post consistently — 1x/day is the sweet spot for growth</li>
                  <li>💬 Reply to comments with videos to boost reach</li>
                  <li>🎵 Use trending sounds for extra algorithmic push</li>
                </ul>
              ) : (
                <ul className="text-xs text-gray-500 flex flex-col gap-1.5 list-none">
                  <li>🔎 Include your keyword in the title AND first 100 chars of description</li>
                  <li>⏱️ Add chapters — they appear in Google search results</li>
                  <li>🖼️ Custom thumbnails increase CTR by up to 90%</li>
                  <li>🔔 Ask for the subscribe in first 30s and last 30s</li>
                  <li>📈 Upload within 48h of trending topics for SEO boosts</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-gray-800 py-6 text-center text-xs text-gray-700">
        ContentCraft — Built with Next.js, Tailwind CSS & Claude AI
      </footer>
    </div>
  );
}
