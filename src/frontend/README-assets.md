# Asset Replacement Guide

This romantic 3-page website uses custom background images that can be easily replaced without modifying any code.

## Background Images

The site uses three background images, one for each page. To replace them, simply copy your new images to the following paths:

### Page 1 (Intro Page)
- **Path**: `frontend/public/assets/generated/bg-page-1.dim_1920x1080.png`
- **Source**: InsMix_20260209_211147926-1.jpg
- **Recommended size**: 1920x1080 or similar aspect ratio
- **Format**: PNG or JPG

### Page 2 (Proposal Page)
- **Path**: `frontend/public/assets/generated/bg-page-2.dim_1920x1080.png`
- **Source**: InsMix_20260209_231320300-1.jpg
- **Recommended size**: 1920x1080 or similar aspect ratio
- **Format**: PNG or JPG

### Page 3 (Final Message Page)
- **Path**: `frontend/public/assets/generated/bg-page-3.dim_1920x1080.png`
- **Source**: InsMix_20260209_231554807-1.jpg
- **Recommended size**: 1920x1080 or similar aspect ratio
- **Format**: PNG or JPG

## Background Music

**Note**: Background music has been intentionally removed from this build to ensure the site loads and functions correctly. The site now operates without any audio playback.

## How to Replace Assets

1. Navigate to `frontend/public/assets/generated/`
2. Replace the existing image files with your new images
3. Keep the exact same filenames as listed above
4. Restart the development server if it's running
5. The new images will appear automatically on each page

## Image Rendering Behavior

All background images are rendered with the following properties:
- **Positioning**: Centered
- **Sizing**: Contain (letterbox) - images are never cropped
- **Repeat**: No-repeat
- **Overlay**: Black translucent overlay above the image for better text readability

This ensures your images are always fully visible regardless of screen size or aspect ratio.
