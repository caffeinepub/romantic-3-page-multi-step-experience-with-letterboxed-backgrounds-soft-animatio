# Asset Replacement Guide

This romantic three-page experience uses static assets that can be easily replaced without any code changes.

## Background Images

Replace the following three background images with your own:

1. **Page 1 (Intro)**: `frontend/public/assets/generated/bg-page-1.dim_1920x1080.png`
   - Current source: `InsMix_20260209_211147926.jpg` (beach collage with "Meri AayZu..." text)
2. **Page 2 (Proposal)**: `frontend/public/assets/generated/bg-page-2.dim_1920x1080.png`
   - Current source: `InsMix_20260209_231320300.jpg` (floral dress collage with flowers)
3. **Page 3 (Final)**: `frontend/public/assets/generated/bg-page-3.dim_1920x1080.png`
   - Current source: `InsMix_20260209_231554807.jpg` (romantic collage with roses and butterflies)

### Image Requirements:
- Format: PNG or JPG
- Recommended dimensions: 1920x1080 or higher
- The images will be displayed using letterbox/contain mode (never cropped)
- Images will be centered with a black transparent overlay

## Background Music

Replace the background music file:

**Audio File**: `frontend/public/assets/generated/background-music.mp3`
- Current source: `Soch_Na_Sake_FULL_VIDEO_SONG_AIRLIFT_Akshay_Kumar,_Nimrat_Kaur_Arijit_Singh,_Tulsi_Kumar_128k.mp3`

### Audio Requirements:
- Format: MP3
- The audio will autoplay on page load (subject to browser policies)
- The audio will loop continuously
- No visible controls will be shown
- Music continues playing across all three pages

## How to Replace

1. Navigate to `frontend/public/assets/generated/`
2. Replace the files with your own, keeping the exact same filenames
3. No code changes are needed
4. Refresh your browser to see the changes

## Current Asset Mapping

For reference, the current assets are mapped as follows:

| Page | Expected Filename | Source File |
|------|------------------|-------------|
| Page 1 (Intro) | `bg-page-1.dim_1920x1080.png` | `InsMix_20260209_211147926.jpg` |
| Page 2 (Proposal) | `bg-page-2.dim_1920x1080.png` | `InsMix_20260209_231320300.jpg` |
| Page 3 (Final) | `bg-page-3.dim_1920x1080.png` | `InsMix_20260209_231554807.jpg` |
| Background Music | `background-music.mp3` | `Soch_Na_Sake_FULL_VIDEO_SONG_AIRLIFT_Akshay_Kumar,_Nimrat_Kaur_Arijit_Singh,_Tulsi_Kumar_128k.mp3` |

**Important**: Keep the exact filenames as specified above. The application references these specific paths.

