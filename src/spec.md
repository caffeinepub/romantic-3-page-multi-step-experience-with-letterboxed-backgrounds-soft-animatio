# Specification

## Summary
**Goal:** Update Pages 1–3 to use the user-uploaded background images and set the uploaded MP3 as the site’s looping background music.

**Planned changes:**
- Replace the three existing background assets by copying/renaming the uploaded images to the existing expected filenames:
  - InsMix_20260209_211147926.jpg -> frontend/public/assets/generated/bg-page-1.dim_1920x1080.png
  - InsMix_20260209_231320300.jpg -> frontend/public/assets/generated/bg-page-2.dim_1920x1080.png
  - InsMix_20260209_231554807.jpg -> frontend/public/assets/generated/bg-page-3.dim_1920x1080.png
- Install the uploaded audio file as frontend/public/assets/generated/background-music.mp3 so it attempts autoplay, loops, has no visible controls, and continues across page navigation.

**User-visible outcome:** Page 1 (/), Page 2 (/proposal), and Page 3 (/final) show the newly uploaded full-screen letterboxed background images with the existing overlay, and the uploaded song plays as continuous looping background music across navigation (with user-interaction fallback if autoplay is blocked).
