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
const allowedOrigins = ["https://small-bytes-henna.vercel.app", 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ["POST", "GET"],
}));

app.use(express.json());

const decoder = new TextDecoder("utf-8");
const supportedFiles = ['txt', 'tiff', 'gif'];

app.get("/", (req, res) => {
  res.json("SmallBytes");
});

app.post("/compress", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const fileName = req.file.originalname;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  if (!supportedFiles.includes(fileExtension)) {
    return res.status(400).json({ message: "File type is not supported." });
  }

  let result = LZW.compress(decoder.decode(req.file.buffer));
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
  const uploadedFilePath = `./files/${req.file.originalname}`;
  const downloadableFilePath = `./files/${parts[0]}.${parts[1]}`;


  if (parts[2]?.toLowerCase() !== 'lzw') {
    return res.status(400).json({ message: "Not a compressed file." });
  }

  if (!supportedFiles.includes(fileExtension)) {
    return res.status(400).json({ message: "File type is not supported." });
  }

  fs.writeFileSync(uploadedFilePath, req.file.buffer, 'binary');

  let result = LZW.decompress(fs.readFileSync(uploadedFilePath, 'ucs2'));

  fs.writeFileSync(downloadableFilePath, result, 'binary');

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${parts[0]}.${parts[1]}"`);

  const fileStream = fs.createReadStream(downloadableFilePath);
  fileStream.pipe(res);

  fileStream.on('close', () => {
    fs.unlink(downloadableFilePath, (err) => {
      if (err)
        console.error(`Error deleting the file from server: ${err}`);
    });
    fs.unlink(uploadedFilePath, (err) => {
      if (err)
        console.error(`Error deleting the file from server: ${err}`);
    });
  });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
