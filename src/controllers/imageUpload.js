const multer = require('multer');
const { storage } = require('../../storage/storage');
const cloudinary = require('cloudinary').v2;

const upload = multer({ storage }).single('image');

const uploadSingleImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed', details: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        res.status(200).json({
            imageUrl: req.file.path,  // Cloudinary secure URL
            public_id: req.file.filename // Cloudinary public_id
        });
    });
};

// 📌 Get all images from Cloudinary folder
const getAllImages = async (req, res) => {
    try {
        const folder = req.query.folder; // Get folder name from request query
        if (!folder) {
            return res.status(400).json({ error: "Folder name is required" });
        }

        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: folder, // Fetch images from a specific folder
            max_results: 100
        });

        const images = result.resources.map(img => ({
            url: img.secure_url,
            public_id: img.public_id
        }));

        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch images", details: error.message });
    }
};

// 📌 Delete a single image from Cloudinary
const deleteImage = async (req, res) => {
    try {
        const public_id = req.query.id; // Public ID is required to delete image

        if (!public_id) {
            return res.status(400).json({ error: "Image public ID is required" });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === "not found") {
            return res.status(404).json({ error: "Image not found" });
        }

        res.status(200).json({ message: "Image deleted successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete image", details: error.message });
    }
};

module.exports = { uploadSingleImage, getAllImages, deleteImage };
