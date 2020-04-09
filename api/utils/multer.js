const multer = require("multer");

const multerConfigMemoryStorage = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  filefilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      var newError = new Error(
        "file type is incorrect. Only JPEG and PNG Format is allowed.Allowed limit of file size is 1024 X 1024 X 2 in kb"
      );
      cb(newError, false);
    }
  },
};

const upload = multer(multerConfigMemoryStorage);

module.exports = upload;
