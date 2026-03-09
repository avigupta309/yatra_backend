import { configDotenv } from "dotenv";
import cloudinaryPkg from "cloudinary";
import streamifier from "streamifier";

const { v2: cloudinary } = cloudinaryPkg;
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function uploadSingleFile(file, folderName) {
  if (!file) return null;

  const uploadFromBuffer = (buffer) =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  try {
    const result = await uploadFromBuffer(file.buffer);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
}

export async function UploadTwoBusImages(exteriorFile, interiorFile) {
  const exteriorPic = exteriorFile
    ? await uploadSingleFile(exteriorFile, "busExterior")
    : null;

  const interiorPic = interiorFile
    ? await uploadSingleFile(interiorFile, "busInterior")
    : null;

  return { exteriorPic, interiorPic };
}
