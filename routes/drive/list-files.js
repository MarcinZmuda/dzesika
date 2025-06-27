const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const auth = oauth2Client;

router.get("/", async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth });

    const folderId = "1wDS9DQGWqZWNq7KndVG_jOjjBhjcjVZG"; // ID folderu „Pliki do Audytu SEO”

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, size, createdTime, webViewLink)",
    });

    res.json(response.data.files);
  } catch (error) {
    console.error("Google Drive API error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
