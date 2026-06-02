"use client";
import { useState } from "react";

interface Props {
  content: string;
  loading: boolean;
}

export default function OutputCard({ content, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Output</span>
        {content && !loading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center gap-3 text-gray-500">
          <span className="animate-spin text-xl">⚙️</span>
          <span className="text-sm">Generating content…</span>
        </div>
      ) : content ? (
        <pre className="flex-1 whitespace-pre-wrap text-sm text-gray-200 font-sans leading-relaxed">{content}</pre>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
          Your generated content will appear here
        </div>
      )}
    </div>
  );
}
