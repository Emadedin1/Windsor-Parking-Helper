# Windsor Parking Helper

Windsor Parking Helper is a simple Chrome extension that helps users find public parking near Windsor, Ontario landmarks and addresses. It is built as a portfolio-friendly demo with local sample data, a clean popup UI, and a right-click address helper for Chrome.

## Features

- Search nearby parking lots from the extension popup
- Right-click any highlighted address and open the extension with that address prefilled
- Save parking spots locally using Chrome storage
- Use local Windsor parking data and hardcoded destination coordinates
- Open Google Maps search or directions directly from each result
- Clean, minimal UI designed for a Chrome extension popup

## Tech Stack

- TypeScript
- React
- Vite
- Manifest V3
- Plain CSS

## How to run locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Build the extension
   ```bash
   npm run build
   ```
3. Open Chrome and load the generated `dist` folder as an unpacked extension

## How to load in Chrome

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Choose **Load unpacked**
4. Select the `dist` directory from this repository

## Known limitations

- The demo uses local sample parking data and hardcoded destination coordinates
- Exact street-address geocoding is not available in this demo
- Google Maps links open in the browser, but no live parking availability is included

## Future improvements

- Connect to City of Windsor open data
- Add real geocoding for full address lookup
- Add live parking availability if a public feed becomes available
- Add a map preview
- Add parking cost information

## Resume Bullet

- Built a Chrome extension using TypeScript, React, Vite, and Manifest V3 to deliver a polished local-first parking search experience.
- Implemented a context-menu workflow, local storage persistence, and Google Maps URL integrations for a practical browser-based demo.
