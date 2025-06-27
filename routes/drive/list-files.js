const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();

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

    const response = await drive.files.list({
      q: "'1wDS9DQGWqZWNq7KndVG_jOjjBhjcjVZG' in parents",
      fields: "files(id, name, mimeType, size, createdTime, webViewLink)",
    });

    res.json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching files from Google Drive.");
  }
});

module.exports = router;
