// index.js
const express = require("express");
const app = express();
const driveRoutes = require("./routes/drive/list-files");

app.use("/drive/list-files", driveRoutes);

app.get("/", (req, res) => {
  res.send("Google Drive API is live 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
