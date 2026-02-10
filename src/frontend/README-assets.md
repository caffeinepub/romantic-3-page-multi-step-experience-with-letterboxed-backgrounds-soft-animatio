# Assets Documentation

## Background Images

The application uses three background images for the three-page romantic experience:

1. **Page 1 (Intro)**: `frontend/public/assets/InsMix_20260210_175919593.jpg`
   - Beach collage image with "meri nitaa" text
   - Used on the intro page with title and CTA

2. **Page 2 (Proposal)**: `frontend/public/assets/generated/bg-page-2.dim_1920x1080.png`
   - Romantic proposal background
   - Used on the "Will you marry me?" page

3. **Page 3 (Final)**: `frontend/public/assets/generated/bg-page-3.dim_1920x1080.png`
   - Final message background
   - Used on the long message and signature page

All backgrounds are rendered using the `FullscreenBackground` component with letterboxing, centered positioning, and a black transparent overlay.

## Background Music

The application includes background music that plays throughout the user experience:

- **Audio File**: `frontend/public/assets/background-music.mp3`
  - This file contains the "Soch Na Sake" track (from AIRLIFT)
  - Single source-of-truth for runtime background music
  - Looped continuously during the experience

### Playback Behavior

1. **Autoplay Attempt**: The app attempts to autoplay music immediately on page load
2. **User Gesture Fallback**: If autoplay is blocked by browser policy, music starts when the user clicks "Enter the Website"
3. **Last Resort**: If both attempts fail, a "Play Music" button appears in the top-right corner
4. **Persistence**: Audio continues playing across all route transitions (/, /proposal, /final)
5. **Controls**: When playing, a mute/unmute toggle appears in the top-right corner

### Browser Compatibility

Modern browsers restrict autoplay of audio with sound. The app handles this gracefully:
- Chrome/Edge: Autoplay typically blocked; starts on "Enter the Website" click
- Firefox: May allow autoplay depending on user settings
- Safari: Autoplay typically blocked; starts on user gesture
- Mobile browsers: Almost always require user gesture

### Technical Implementation

- Audio is managed by `BackgroundAudioProvider` context
- Single `<audio>` element created once and persists across routes
- Volume set to 50% by default
- Loop enabled for continuous playback
- Comprehensive console diagnostics for debugging playback issues

### Diagnostics

The app logs detailed information to the browser console:
- Audio source URL and loading status
- Autoplay attempt results
- User gesture playback attempts
- Any errors with network state and ready state details

Check the browser console for `[BackgroundAudio]` prefixed messages to diagnose playback issues.
