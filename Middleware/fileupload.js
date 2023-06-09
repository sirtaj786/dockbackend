const path=require('path')
const multer=require('multer')

const fileupload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "uploads");
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		},
	}),
})

module.exports = fileupload ;