const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };

  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  try {
    const result = await cloudinary.uploader.upload(file.path, options);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error("Error uploading image to Cloudinary");
  }
};
