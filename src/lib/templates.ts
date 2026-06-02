import type { Template } from "./types";

export const templates: Template[] = [
  {
    id: "tiktok-hook-curiosity",
    name: "Curiosity Hook",
    platform: "tiktok",
    contentType: "hook",
    category: "Hooks",
    description: "Open with a bold statement that makes viewers need to watch on.",
    fields: [
      { key: "topic", label: "Topic", placeholder: "e.g. morning routines", type: "text" },
      { key: "fact", label: "Surprising fact or claim", placeholder: "e.g. most people do this wrong", type: "text" },
    ],
    output: (v) =>
      `Wait — you've been ${v.topic} WRONG this whole time. 👀\n\nHere's what nobody tells you about ${v.fact}:\n\n[Share your point here]\n\nSave this before TikTok removes it. #${v.topic.replace(/\s+/g, "")} #LearnOnTikTok`,
  },
  {
    id: "tiktok-hook-storytime",
    name: "Storytime Hook",
    platform: "tiktok",
    contentType: "hook",
    category: "Hooks",
    description: "Pull viewers in with a relatable or dramatic story opening.",
    fields: [
      { key: "emotion", label: "Emotion/situation", placeholder: "e.g. embarrassing moment", type: "text" },
      { key: "twist", label: "The unexpected twist", placeholder: "e.g. it changed my life", type: "text" },
    ],
    output: (v) =>
      `Story time: the most ${v.emotion} thing happened to me — and I honestly can't believe it led to ${v.twist}.\n\nLet me explain... 🧵\n\n[Tell your story in 3-5 punchy sentences]\n\nPart 2 coming if this does numbers 🫶`,
  },
  {
    id: "tiktok-script-tutorial",
    name: "Tutorial / How-To Script",
    platform: "tiktok",
    contentType: "script",
    category: "Scripts",
    description: "A clear step-by-step tutorial structure optimized for TikTok.",
    fields: [
      { key: "topic", label: "What are you teaching?", placeholder: "e.g. how to edit videos on your phone", type: "text" },
      { key: "steps", label: "Key steps (comma-separated)", placeholder: "e.g. Download app, Import clip, Add music", type: "text" },
      { key: "duration", label: "Video length", type: "select", options: ["15 seconds", "30 seconds", "60 seconds", "3 minutes"], placeholder: "" },
    ],
    output: (v) => {
      const steps = v.steps.split(",").map((s, i) => `Step ${i + 1}: ${s.trim()}`).join("\n");
      return `[HOOK — 0-3s]\n"I'm going to show you ${v.topic} in under ${v.duration}."\n\n[BODY]\n${steps}\n\n[CTA — last 3s]\n"Follow for more quick tutorials. Save this so you don't forget!" 💾`;
    },
  },
  {
    id: "tiktok-script-pov",
    name: "POV / Trend Script",
    platform: "tiktok",
    contentType: "script",
    category: "Scripts",
    description: "Leverage trending POV format for relatable, shareable content.",
    fields: [
      { key: "scenario", label: "POV scenario", placeholder: "e.g. you just discovered a life hack", type: "text" },
      { key: "reaction", label: "Audience reaction you want", placeholder: "e.g. laughter, inspiration", type: "text" },
    ],
    output: (v) =>
      `POV: ${v.scenario}\n\n[Act it out or narrate the scene]\n\nWho else can relate?? 😭 ${v.reaction} incoming.\n\nDuet this if this is you 👇 #POV #relatable`,
  },
  {
    id: "youtube-title-how-to",
    name: "How-To Title Formula",
    platform: "youtube",
    contentType: "title",
    category: "Titles",
    description: "High-CTR title using the proven how-to formula.",
    fields: [
      { key: "skill", label: "Skill or outcome", placeholder: "e.g. edit videos like a pro", type: "text" },
      { key: "time", label: "Timeframe (optional)", placeholder: "e.g. in 10 minutes", type: "text" },
    ],
    output: (v) =>
      `How To ${v.skill}${v.time ? ` (${v.time})` : ""} — Complete Beginner's Guide`,
  },
  {
    id: "youtube-title-number-list",
    name: "Listicle Title Formula",
    platform: "youtube",
    contentType: "title",
    category: "Titles",
    description: "Number-based title that sets clear expectations and drives clicks.",
    fields: [
      { key: "number", label: "Number of tips/items", placeholder: "e.g. 7", type: "text" },
      { key: "topic", label: "Topic", placeholder: "e.g. video editing tricks", type: "text" },
      { key: "benefit", label: "Key benefit", placeholder: "e.g. that pros actually use", type: "text" },
    ],
    output: (v) => `${v.number} ${v.topic} ${v.benefit} (${new Date().getFullYear()})`,
  },
  {
    id: "youtube-description-standard",
    name: "Standard Video Description",
    platform: "youtube",
    contentType: "description",
    category: "Descriptions",
    description: "SEO-optimized description with timestamps, links, and CTA sections.",
    fields: [
      { key: "summary", label: "Video summary (1-2 sentences)", placeholder: "e.g. In this video, I show you...", type: "textarea" },
      { key: "keywords", label: "3-5 keywords", placeholder: "e.g. video editing, premiere pro, beginner", type: "text" },
      { key: "channel", label: "Channel name", placeholder: "e.g. CreatorPro", type: "text" },
    ],
    output: (v) =>
      `${v.summary}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n📌 CHAPTERS\n00:00 — Intro\n00:30 — [Add your chapters here]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n🔔 Subscribe to ${v.channel} for more content like this!\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n🔗 LINKS MENTIONED\n• [Add your links here]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\n#${v.keywords.split(",").map((k) => k.trim().replace(/\s+/g, "")).join(" #")}`,
  },
  {
    id: "youtube-script-intro",
    name: "YouTube Intro Script",
    platform: "youtube",
    contentType: "script",
    category: "Scripts",
    description: "The critical first 30 seconds — hook, promise, and subscribe prompt.",
    fields: [
      { key: "topic", label: "Video topic", placeholder: "e.g. growing on YouTube in 2025", type: "text" },
      { key: "promise", label: "What will viewers learn/get?", placeholder: "e.g. the exact strategy I used to hit 10k subs", type: "text" },
      { key: "channel", label: "Channel name", placeholder: "e.g. CreatorPro", type: "text" },
    ],
    output: (v) =>
      `[HOOK — 0-5s]\n"${v.promise} — and I'm breaking it all down for you right now."\n\n[INTRO — 5-15s]\n"What's up, welcome back to ${v.channel}. If you're new here, I'm [Your Name] and I help [target audience] with ${v.topic}."\n\n[PROMISE — 15-25s]\n"By the end of this video, you'll know exactly ${v.promise}. So make sure you watch until the end because the most important part is at [timestamp]."\n\n[SUBSCRIBE — 25-30s]\n"And if you haven't already, hit subscribe — I post [cadence] and you don't want to miss what's coming next."`,
  },
];

export const categories = [...new Set(templates.map((t) => t.category))];

export function getTemplates(platform: string, contentType?: string) {
  return templates.filter(
    (t) =>
      (t.platform === platform || t.platform === "both") &&
      (contentType ? t.contentType === contentType : true)
  );
}
