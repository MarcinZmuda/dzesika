// routes/drive/list-files.js
const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    auth.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: `'1wDS9DQGWqZWNq7KndVG_jOjjBhjcjVZG' in parents`,
      fields: "files(id, name, mimeType)"
    });

    res.status(200).json(response.data.files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
