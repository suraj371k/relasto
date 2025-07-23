"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.storage = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: () => ({
        folder: "real-estate-properties",
        allowed_formats: ["jpeg", "png", "jpg", "avif"],
        transformation: [{ width: 1200, height: 800, crop: "limit" }],
    }),
});
