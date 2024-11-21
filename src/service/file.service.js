import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import { validateFile } from "../validation/fileValidation.js";

const processFileUpload = async (file, req, directory) => {
  const { extension } = validateFile(file);
  const hashFileName = await bcrypt.hash(file.name + Date.now(), 10);
  const fileName = hashFileName.replace(/[^a-zA-Z0-9]/g, "") + extension;

  const uploadDir = path.join("public/uploads", directory);
  const uploadPath = path.join(uploadDir, fileName);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    file.mv(uploadPath, (err) => {
      if (err) {
        reject(new Error("File upload failed: " + err.message));
      } else {
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${directory}/${fileName}`;
        resolve(imageUrl);
      }
    });
  });
};

const updateFileUpload = async (file, req, directory, oldFileName) => {
  const { extension } = validateFile(file);
  const hashFileName = await bcrypt.hash(file.name + Date.now(), 10);
  const fileName = hashFileName.replace(/[^a-zA-Z0-9]/g, "") + extension;

  const uploadDir = path.join("public/uploads", directory);
  const uploadPath = path.join(uploadDir, fileName);

  if (oldFileName) {
    const oldFilePath = path.join(uploadDir, oldFileName);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    file.mv(uploadPath, (err) => {
      if (err) {
        reject(new Error("File upload failed: " + err.message));
      } else {
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${directory}/${fileName}`;
        resolve(imageUrl);
      }
    });
  });
};

const deleteFile = async (req, directory, fileName) => {
  const uploadDir = path.join("public/uploads", directory);
  const filePath = path.join(uploadDir, fileName);

  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    resolve(true);
  });
};

export default {
  processFileUpload,
  updateFileUpload,
  deleteFile,
};
