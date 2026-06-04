# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js, port 3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

There is no test suite in this project.

The app requires `ANTHROPIC_API_KEY` in the environment for the AI generation feature. Set it in `.env.local`.

## Architecture

**ContentCraft** is a Next.js 15 single-page app for generating TikTok and YouTube content. It has two modes: AI generation (calls the Anthropic API) and static templates (runs entirely client-side).

### Data flow

All UI state (`platform`, `contentType`, `mode`, `output`, `loading`) lives in `src/app/page.tsx` and is passed down as props — no global state library.

**AI mode:** `AIGeneratorForm` collects form values → `POST /api/generate` → `src/app/api/generate/route.ts` calls Anthropic SDK → content string returned to page → rendered in `OutputCard`.

**Template mode:** `TemplateCard` collects field values locally → calls `template.output(values)` (a plain function) → result sent directly to `OutputCard`. No network request.

### Key files

- `src/lib/types.ts` — canonical types: `Platform`, `ContentType`, `Template`, `GenerateRequest`, `GenerateResponse`
- `src/lib/templates.ts` — all static templates as an array; each has a typed `fields` array and an `output(values)` function that interpolates them into a string. `getTemplates(platform, contentType?)` filters this array.
- `src/app/api/generate/route.ts` — the only server-side code. Builds a system prompt from `PLATFORM_CONTEXT` and a user prompt from `CONTENT_TYPE_INSTRUCTIONS`, then calls `client.messages.create` with `claude-sonnet-4-6` at 1024 max tokens.

### Content type constraints

`title` is YouTube-only. `ContentTypeSelector` hides it when platform is TikTok, and `page.tsx` resets `contentType` to `"hook"` whenever the user switches to TikTok while `title` is selected.

### Styling

Tailwind CSS with a dark theme (`gray-950` base). All interactive color accents use purple/pink gradient. No component library — all UI is hand-rolled with Tailwind utility classes.

### Adding a template

Add an entry to the `templates` array in `src/lib/templates.ts`. It must satisfy the `Template` interface: set `platform` to `"tiktok"`, `"youtube"`, or `"both"`; set `contentType` to one of the four union values; define `fields` with `key`, `label`, `placeholder`, and `type`; and implement `output` as a function that interpolates the field values into a formatted string.
