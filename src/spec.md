# Specification

## Summary
**Goal:** Apply the confirmed styling updates to Page 1 and Page 2, swap Page 1’s background image, and re-enable looping background music that persists across all three routes.

**Planned changes:**
- Update Page 1 (IntroPage) title typography and placement: keep its horizontal position, make it larger, and move it slightly downward; increase the paragraph font size; keep title color as wine and paragraph color as unicorn silver.
- Replace the Page 1 background image to use the provided generated asset and ensure it is referenced via the correct frontend static asset path while keeping existing background rendering rules (centered, no-repeat, contain/letterbox, black translucent overlay).
- Change the Page 1 navigation CTA (to “/proposal”) styling to use the Kaitoke color while maintaining readable contrast.
- Update Page 2 proposal question (“Will you marry me ?”) line color to Barbie Pink.
- Add bundled background music (“Soch_Na_Sake...”) that starts only after the EnterWebsiteGate interaction, loops continuously, has no visible controls, and continues uninterrupted across navigation between “/”, “/proposal”, and “/final”.
- Ensure updated assets and styles are the ones actually referenced at runtime so the live build reflects the requested changes (remove/replace stale asset references).

**User-visible outcome:** Page 1 shows the new background and updated title/paragraph styling with a Kaitoke-colored CTA to Page 2; Page 2 shows the proposal heading in Barbie Pink; after the entry interaction, background music plays and loops continuously without controls and without stopping when moving through Page 1 → Page 2 → Page 3.
