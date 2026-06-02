import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import type { GenerateRequest } from "@/lib/types";

const client = new Anthropic();

const PLATFORM_CONTEXT: Record<string, string> = {
  tiktok:
    "TikTok (short-form vertical video, 15s–3min, casual & energetic tone, hook in first 1-2 seconds, trending sounds/hashtags, Gen Z + millennial audience)",
  youtube:
    "YouTube (long-form or Shorts, structured with intro/body/CTA, SEO-optimized titles & descriptions, retention-focused, broad demographics)",
};

const CONTENT_TYPE_INSTRUCTIONS: Record<string, string> = {
  hook: "Write a scroll-stopping opening hook. It must grab attention in the first 1-2 seconds. Use pattern interrupts, bold claims, or emotional triggers. Keep it punchy and under 3 sentences.",
  script:
    "Write a complete video script with clearly labeled sections: [HOOK], [BODY/MAIN CONTENT], and [CTA]. Include natural spoken language, pacing cues in brackets, and engagement prompts.",
  description:
    "Write an SEO-optimized video description. Include: a compelling first 2 lines (visible before 'show more'), key topics covered, relevant hashtags at the end, and a clear CTA (subscribe/like/comment).",
  title:
    "Write 5 high-CTR video title options. Each should be under 70 characters, include the main keyword, create curiosity or promise a benefit, and use proven formulas (How-To, Number Lists, Secrets, etc).",
};

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { platform, contentType, topic, tone, targetAudience, duration, keywords, extraContext } = body;

    if (!topic || !platform || !contentType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const systemPrompt = `You are an expert social media content strategist specializing in ${PLATFORM_CONTEXT[platform]}.
You craft content that gets views, drives engagement, and grows audiences.
Always write in a natural, human voice — never robotic or generic.
Output ONLY the content itself with no meta-commentary or explanations.`;

    const userPrompt = `${CONTENT_TYPE_INSTRUCTIONS[contentType]}

Platform: ${PLATFORM_CONTEXT[platform]}
Topic: ${topic}
Tone: ${tone}
Target Audience: ${targetAudience}${duration ? `\nVideo Duration: ${duration}` : ""}${keywords ? `\nKeywords to include: ${keywords}` : ""}${extraContext ? `\nAdditional context: ${extraContext}` : ""}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const content = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ content });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate content. Please try again." }, { status: 500 });
  }
}
