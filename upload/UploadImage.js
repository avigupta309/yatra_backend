import { configDotenv } from "dotenv";
import cloudinaryPkg from "cloudinary";
const { v2: cloudinary } = cloudinaryPkg;
import streamifier from "streamifier";
configDotenv();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function UploadImage(req) {
  if (!req.file) return null;
  let profileImage = "##";
  if (req.file) {
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profileImages" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    try {
      const result = await uploadFromBuffer(req.file.buffer);
      profileImage = result.secure_url;
      return profileImage;
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      return "Image upload failed";
    }
  } else {
    return null;
  }
}
