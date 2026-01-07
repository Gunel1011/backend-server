const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "djleicw7y",
    api_key: "531731418122978",
    api_secret: "gjNCQ6OUIyQGfDTBph6OElWiFFM",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "jazean-coffee",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});

module.exports = {
    storage,
    cloudinary,
};
