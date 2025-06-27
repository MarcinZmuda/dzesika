import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

app.get('/drive/list-files', async (req, res) => {
  try {
    const result = await drive.files.list({ pageSize: 10 });
    res.json({ files: result.data.files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/drive/file-content/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/drive/metadata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const metadata = await drive.files.get({ fileId: id, fields: '*' });
    res.json(metadata.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
