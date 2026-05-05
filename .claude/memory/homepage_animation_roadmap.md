---
name: Homepage Animation Roadmap (Music/DJ Vibe)
description: Planned music/DJ-themed animations across homepage, following hero section's bars + waveform aesthetic. Roadmap agreed 2026-05-04, implementing incrementally.
type: project
originSessionId: cb1f85ca-5bfe-4edf-8bb0-a10ec34d997e
---
User wants to extend the music/DJ visual language from the hero section (animated spectrum bars + scrolling sine waveform in `HeroRotating.tsx`) to the rest of the homepage. Implementation is incremental and may span multiple sessions.

**Why:** Hero already has strong DJ-themed motion. Rest of the page is static — opportunity to give the whole page a unified "tempo" without going overboard.

**How to apply:** Implement in order. Stop after each item to confirm before moving on. Keep animations subtle and on-brand (neon-500 = #d946ef accent, dark `ink` background). Reuse existing CSS keyframes (`waveBar`, `waveSineScroll`) where possible.

**Roadmap (priority order):**
1. **Animated waveform section dividers** — replace `border-t border-hairline` (used between most sections in `src/app/(frontend)/page.tsx` and on `StatsStrip`/`CTABlock`) with a thin horizontal line + traveling neon pulse gradient. Subtle, unobtrusive.
2. **ServiceCard hover = mini equalizer** — when hovering a `ServiceCard` (`src/components/marketing/ServiceCard.tsx`), 4-5 small animated bars appear in a corner. Reinforces DJ vibe on interaction.
3. **StatsStrip pulse glow** — numbers (800+, 8 ani, 5.0★) in `StatsStrip.tsx` get a subtle neon glow that pulses at ~120 BPM (~500ms cycle), like a metronome.
4. **Vinyl/disc rotativ in About section** — spinning vinyl record decorative element next to Lawre's portrait in homepage About section. Low opacity, slow rotation.
5. **(deferred / nice-to-have) CTABlock background spectrum bars** — very subtle ambient bars (opacity ~10%) as background on `CTABlock`. Lowest priority; user flagged it as the smallest impact.

**Status:** All 5 items complete as of 2026-05-05. Roadmap fully implemented.
