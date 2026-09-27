// Service chứa các thao tác nghiệp vụ liên quan tới Cloudinary
const cloudinary = require('../config/cloudinary');

// Xoá ảnh trên Cloudinary theo public_id (dùng khi user xoá/đổi avatar)
async function deleteImage(publicId) {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
}

// Lấy public_id từ URL Cloudinary để phục vụ việc xoá ảnh cũ
function getPublicIdFromUrl(url) {
  if (!url) return null;
  const parts = url.split('/');
  const fileWithExt = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  const fileName = fileWithExt.split('.')[0];
  return `${folder}/${fileName}`;
}

module.exports = { deleteImage, getPublicIdFromUrl };
