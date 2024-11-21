import path from "path";

export const validateFile = (file) => {
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const extension = path.extname(file.name).toLowerCase();
  const fileSize = file.data.length;

  if (!allowedTypes.includes(extension)) {
    throw new Error("Invalid file type. Allowed types are .png, .jpg, .jpeg");
  }

  if (fileSize > 5000000) {
    throw new Error("File must be less than 5 MB");
  }

  return { extension, fileSize };
};
