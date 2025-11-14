<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jpRTNXGuU-TBA7xB9q9Bwf6D2bsn5GGS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jpRTNXGuU-TBA7xB9q9Bwf6D2bsn5GGS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploying to Vercel

This project uses Vite. Recommended Vercel settings:

- Build command: `npm run build`
- Output directory: `dist`

You can deploy from the Vercel dashboard by importing the GitHub repository, or use the CLI:

```powershell
npm install -g vercel
cd 'C:\Users\joshd\Downloads\qualibean-monitoring-dashboard'
vercel --prod
```

`vercel.json` is included and configures Vercel to use `dist` as the output directory.
