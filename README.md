# Science Challenge (PWA)

This package contains a Progressive Web App (PWA) named **Science Challenge** ready for GitHub Pages deployment.

## What's included
- `index.html`
- `quiz.js` (quiz logic + CSV download)
- `manifest.json` (PWA manifest)
- `service-worker.js` (offline caching)
- `icons/icon-192.png` and `icons/icon-512.png`
- `README.md` (this file)

## How to deploy (GitHub Pages)
1. Create a new GitHub repository and upload the contents of this folder.
2. In the repository, go to **Settings > Pages** and set the source to `main` branch and the root folder `/`.
3. After a few minutes the site will be available at `https://<username>.github.io/<repo>/`.

## Google Sheets integration
The `SHEET_URL` constant in `quiz.js` is already set to the URL you provided. No further changes are required unless you want to use a different endpoint.

## Notes
- Service worker and manifest require HTTPS (GitHub Pages provides HTTPS automatically).
- If you add more questions, update the `questions` array in `quiz.js` and ensure the array length matches the intended count.
- CSV download is available on the results page after finishing the quiz.
