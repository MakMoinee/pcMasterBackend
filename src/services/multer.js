const multer = require("multer");
const path = require("path");
//storage for image upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter for extention
let fileFilter = function (req, file, cb) {
  console.log(file.mimetype);
  const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

function getUpload(key) {
  //upload for to pass storage, file size limit and filter
  //maximum file size is 10Mb
  let upload = multer({
    storage: storage,
    // limits: { fileSize: 10 ** 7 },
    fileFilter: fileFilter,
  }).single(key);
  return upload;
}

module.exports = getUpload;
