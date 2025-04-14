// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const CSV_FILE = path.join(__dirname, "test.csv");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Create CSV if not exists
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "Name,Email\n", "utf8");
}

// Read CSV content
app.get("/get-csv", (req, res) => {
  fs.readFile(CSV_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading file.");
    res.type("text/plain").send(data);
  });
});

// Save updated CSV content
app.post("/save-csv", (req, res) => {
  const content = req.body.data;
  fs.writeFile(CSV_FILE, content, "utf8", err => {
    if (err) return res.status(500).send("Error saving file.");
    res.send("Saved.");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
