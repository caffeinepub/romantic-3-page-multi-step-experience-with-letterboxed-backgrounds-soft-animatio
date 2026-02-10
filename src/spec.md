# Specification

## Summary
**Goal:** Fix the missing default background music asset and ensure the existing autoplay/gesture/fallback playback behavior works as intended.

**Planned changes:**
- Add the default audio file at `frontend/public/assets/background-music.mp3` so it is available at runtime via `/assets/background-music.mp3`.
- Ensure `BackgroundAudioProvider` continues using `/assets/background-music.mp3` as the default source and retains the existing playback flow (autoplay attempt on load, play on user gesture via the entry gate, and a manual “Play Music” fallback button if needed).
- Prevent the UI from showing the “Default audio unavailable. Please choose a song file to play.” message when the default asset is present, and avoid `<audio>` missing-file console errors.

**User-visible outcome:** On a fresh load, the app can play the default background track (or gracefully fall back to gesture/button-based playback if autoplay is blocked), and users can still choose a local audio file to override the default.
