# Translation Workflow — Argentina Passport

This project keeps **English (`en`) as the single source of truth**. Every other locale must mirror the English structure and differ only in translated strings. Follow this workflow whenever copy changes or new pages ship.

## 1. Author & approve English copy
- Update `src/messages/en.json` with the final microcopy (respecting `docs/brand/voice.md`).
- Keep CTA text uppercase (brand rule) and avoid punctuation that the brand forbids (exclamation marks, emojis).
- Once approved, tag the commit or note the hash so translators know which version to translate.

## 2. Prepare translation packet
- Export the relevant keys plus context (section name, screenshot, intended audience). A quick option is to share the JSON subtree for the page plus screenshots from the linked Figma node.
- Include:
  1. This guide + `docs/brand/voice.md`.
  2. Glossary/terminology clarifications (e.g., “citizenship by investment”, “white-glove”).
  3. Any constraints (max length, uppercase, keep slash prefix in eyebrows).

## 3. Translate ES / RU / AR
- Translators should work offline and return JSON files matching the English structure exactly.
- Arabic must remain RTL-friendly: avoid inserting Latin punctuation mid-sentence unless it is part of a brand term.
- Spot-check for encoding issues; files must be UTF-8 without BOM.

## 4. Integrate & verify
1. Replace the locale files under `src/messages/{locale}.json`.
2. Run:
   ```bash
   corepack pnpm typecheck
   corepack pnpm lint
   ```
   (and `corepack pnpm run build` once the Windows `spawn EPERM` issue is resolved).
3. Manual QA (desktop & mobile) for `/en`, `/es`, `/ru`, `/ar`:
   - Navigation + footer links translate correctly without duplicating the locale prefix.
   - RTL layout in `/ar` keeps logical padding (`ps-`/`pe-`) and mirrored icons.
   - Long paragraphs don’t overflow the design containers.

## 5. Record decisions
- If translators introduce new terminology, log it here so future updates stay consistent.
- When specs add new sections, append the relevant key paths to this document so all locales stay in sync.

## Known pending item
- `corepack pnpm run build` currently fails with `Error: spawn EPERM` on Windows. Resolve that OS-level permission issue before relying on the production build for QA.
