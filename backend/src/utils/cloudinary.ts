import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: () => ({
    folder: "real-estate-properties",
    allowed_formats: ["jpeg", "png", "jpg" , "avif"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  }),
});

export { cloudinary };
