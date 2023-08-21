import fs from 'fs';
import path from 'path';
import cors from "cors";
import multer from "multer";
import express from "express";
import LZW from './lib/LZW.js';
import { fileURLToPath } from 'url';

const port = 3001;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // Use the cors middleware 
app.use(express.json());
const supportedFiles = ['txt', 'tiff', 'gif'];

app.post("/compress", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const fileName = req.file.originalname;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  if (!supportedFiles.includes(fileExtension)) {
    return res.status(400).json({ message: "File type is not supported." });
  }

  let result = LZW.compress(req.file.buffer);
  fs.writeFileSync('./files/' + fileName + '.lzw', result, 'ucs2');
  const filePath = path.join(__dirname, 'files', `${fileName}.lzw`);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.lzw"`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  fileStream.on('close', () => {
    fs.unlink(filePath, (err) => {
      if (err)
        console.error(`Error deleting the file from server: ${err}`);
    });
  });

});

app.post("/decompress", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const fileName = req.file.originalname;
  const parts = fileName.split('.');
  const fileExtension = parts[1]?.toLowerCase();

  if (parts[2]?.toLowerCase() === 'lzw') {
    return res.status(400).json({ message: "Not a compressed file." });
  }

  if (!supportedFiles.includes(fileExtension)) {
    return res.status(400).json({ message: "File type is not supported." });
  }

  let result = LZW.decompress(req.file.buffer);
  fs.writeFileSync(`./files/${parts[0]}.${parts[1]}`, result, 'ucs2');
  const filePath = path.join(__dirname, 'files', `${fileName}.lzw`);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${parts[0]}.${parts[1]}"`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  fileStream.on('close', () => {
    fs.unlink(filePath, (err) => {
      if (err)
        console.error(`Error deleting the file from server: ${err}`);
    });
  });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
