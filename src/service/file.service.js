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

export default {
  processFileUpload,
};
