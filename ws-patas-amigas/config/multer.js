const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
});

module.exports = upload;