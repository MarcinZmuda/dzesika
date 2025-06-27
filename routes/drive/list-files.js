// routes/drive/list-files.js
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

// Zakładamy, że masz autoryzację zrobioną wcześniej
const auth = /* twoja konfiguracja autoryzacji z refresh_token itd. */;

router.get("/", async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: "'1wDS9DQGWqZWNq7KndVG_jOjjBhjcjVZG' in parents",
      fields: "files(id, name, mimeType, size, createdTime, webViewLink)",
    });

    res.json(response.data.files);
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd podczas pobierania plików z Google Drive.");
  }
});

module.exports = router;
