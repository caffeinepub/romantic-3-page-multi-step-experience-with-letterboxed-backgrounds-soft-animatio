# Specification

## Summary
**Goal:** Ensure the app uses the provided “Soch_Na_Sake_FULL....” audio file as the looping background music and starts playing automatically without requiring a dedicated Play button.

**Planned changes:**
- Add the provided “Soch_Na_Sake_FULL....” MP3 to `frontend/public/assets/` and update the runtime audio source to point to that exact file (either by referencing the filename directly in `BackgroundAudioProvider` or by replacing the file served at `/assets/background-music.mp3` while keeping that path working).
- Keep an autoplay play attempt on initial app load, and additionally trigger a play attempt on the existing “Enter the Website” click in `EnterWebsiteGate` so audio starts immediately after the first user gesture when required by browser policies.
- Add minimal runtime diagnostics around the play attempt (e.g., log the resolved asset URL and any `.play()` rejection reason) and ensure the existing `BackgroundAudioProvider` instance persists across route changes so playback doesn’t restart.
- Avoid duplicate audio copies by keeping only one source-of-truth background music file in `frontend/public/assets/` for runtime use.

**User-visible outcome:** Background music starts automatically (or immediately after clicking “Enter the Website” on browsers that require a gesture), loops as before, and if playback fails the console provides clear diagnostics without breaking app navigation.
