const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ddisgmyfi',
  api_key: '844432384522493',
  api_secret: 'ins99Ea5ZOPIVVL7nQGGpwhZEWY'
});

const uploadImage = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageBuffer, { resource_type: "auto" }, (error, result) => {
      if (error) return reject(error);
      return resolve(result.url);
    });
  });
};

module.exports = uploadImage;