const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = `./uploads/${file.fieldname}`;
    fs.mkdirSync(destinationDir, { recursive: true });
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if ((file.mimetype === "image/png", file.mimetype === "image/jpeg")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
