# Specification

## Summary
**Goal:** Make the uploaded “Soch Na Sake…” track the default background music with immediate autoplay behavior, and reposition the song picker to the top of the page without UI overlap.

**Planned changes:**
- Replace/update `frontend/public/assets/background-music.mp3` so it matches the uploaded audio file whose name starts with “Soch Na Sake”, while keeping the local file picker behavior intact.
- On site load, attempt to autoplay the default track immediately; preserve the existing fallback flow (Enter-gate gesture retry, then a visible “Play Music” button if needed).
- Move the fixed song selection control from the bottom to the top of the viewport, ensuring it does not cover the existing top-right play/mute controls and that its labels/messages remain in English.
- Add an English status message for the case where the default audio asset can’t be loaded, instructing the user to choose a song file.

**User-visible outcome:** On first visit, the site tries to start playing “Soch Na Sake…” automatically; if blocked, the existing Enter/Play fallbacks still work. The song picker appears at the top (without overlapping play/mute controls), and users can still choose a local song file.
