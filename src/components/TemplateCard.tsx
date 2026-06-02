"use client";
import { useState } from "react";
import type { Template } from "@/lib/types";

interface Props {
  template: Template;
  onUse: (output: string) => void;
}

export default function TemplateCard({ template, onUse }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const allFilled = template.fields.every((f) => values[f.key]?.trim());

  const handleGenerate = () => {
    if (!allFilled) return;
    onUse(template.output(values));
  };

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors">
      <button className="w-full text-left" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-gray-100 text-sm">{template.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{template.description}</p>
          </div>
          <span className="text-gray-600 text-xs mt-0.5">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="mt-4 flex flex-col gap-3">
          {template.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select…</option>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={values[field.key] || ""}
                  onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleGenerate}
            disabled={!allFilled}
            className="w-full py-2 rounded-lg text-sm font-semibold bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
          >
            Use Template →
          </button>
        </div>
      )}
    </div>
  );
}
