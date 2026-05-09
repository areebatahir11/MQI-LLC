// src/lib/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(base64String) {
  // Agar pehle se Cloudinary URL hai toh skip karo
  if (base64String?.startsWith("http")) return base64String;
  // Koi image nahi
  if (!base64String) return null;

  const result = await cloudinary.uploader.upload(base64String, {
    folder: "mqi-portfolio",
    transformation: [
      { width: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  return result.secure_url;
}

export async function deleteImage(imageUrl) {
  if (!imageUrl?.includes("cloudinary")) return;

  // URL se public_id nikalo — folder/filename (without extension)
  // e.g. https://res.cloudinary.com/xxx/image/upload/v123/mqi-portfolio/abc123.webp
  const match = imageUrl.match(/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
  if (!match) return;

  const publicId = match[1]; // e.g. "mqi-portfolio/abc123"
  await cloudinary.uploader.destroy(publicId);
}