const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxycuikv8',
    api_key: '824729544993874',
    api_secret: 'W25TO2kGMmqW6ZiP83YkfBorYv8'
});

module.exports = cloudinary;