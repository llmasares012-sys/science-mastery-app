# Science Mastery App (PWA)

A Progressive Web App for science quizzes with a 60-second timer, automatic retry for unanswered questions, Gmail login requirement, progress bar, and Google Sheet integration.

## Deployment on GitHub Pages

1. Upload all files to a new GitHub repository.
2. Go to **Settings → Pages → Source → `main` branch → `/ (root)`**.
3. Wait a few minutes for GitHub Pages to build your site.
4. Your app will be live at: `https://<your-username>.github.io/<repo-name>/`

## Folder structure

```
science-mastery-app/
├── index.html
├── quiz.js
├── manifest.json
├── service-worker.js
├── README.md
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Google Sheets Integration

1. Create a Google Apps Script linked to a Sheet.
2. Deploy as a Web App (set **Anyone** can access).
3. Copy its Web App URL and paste into `SHEET_URL` inside `quiz.js`.
4. The app sends quiz results automatically via `fetch()`.

## PWA Features

- Works offline after first load.
- Installable on desktop or mobile.
- Uses service worker caching for fast performance.

---
© 2025 Science Mastery App by fool.
