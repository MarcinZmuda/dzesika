const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();

// Autoryzacja OAuth2 z refresh tokenem
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

router.get("/", async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    // 👉 Folder ID: "Pliki do Audytu SEO"
    const folderId = "1wDS9DQGWqZWNq7KndVG_jOjjBhjcjVZG";

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, modifiedTime)",
    });

    res.status(200).json(response.data.files);
  } catch (error) {
    console.error("❌ Error reading from Google Drive:", error);
    res.status(500).json({ error: "Błąd pobierania plików z Google Drive." });
  }
});

module.exports = router;
