import cloudinary from '../config/cloudinary.js';

export const uploadToFileStorage = async (filePath, folder = 'slp_uploads') => {
  return await cloudinary.uploader.upload(filePath, { folder });
};
