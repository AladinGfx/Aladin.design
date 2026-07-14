<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0dfa652a-3947-49b8-b341-290582e91918

## Updating thumbnails

Drop image files (`.png`, `.jpg`, `.webp`) into the `thumbs/` folder — every image in there appears in the portfolio grid automatically, sorted by filename. Use number prefixes (`01-`, `02-`, ...) to control the order. Delete a file to remove it from the site. No code changes needed.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
