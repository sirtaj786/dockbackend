const express = require("express");
const fileupload  = require("../Middleware/fileupload");
const fileModel = require("../Model/file.model");
const fs = require("fs");
var multer = require('multer');

const fileRouter = express.Router();
var upload = multer({dest:'./uploads/'});
fileRouter.post("/upload", upload.single("file") , (req, res) => {

	res.send({"mesg":"File uploaded successfully!","file":req.file});
	console.log(req.file)
});


 fileRouter.post('/post', upload.single('file'), function(req, res) {
	
  console.log(req.file);
 res.send("file saved on server");
 
 });

fileRouter.get("/view", upload.single("file"), (req, res) => {
	const destination = "./uploads/";
	let arr=[]
	fs.readdir(destination, (err, files) => {
		// arr.push(files)
		res.send(files);
	});
});

fileRouter.post("/uploadDetails", async (req, res) => {
	let { email, file,size } = req.body;
	// console.log(userId, file, size);
	try {
		let details = new fileModel({ email, file, size });
		await details.save();
		return res.status(200).send(details);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

fileRouter.get("/uploadDetails/:email", async (req, res) => {
	const { email } = req.params;
	try {
		const details = await fileModel.find({ email});
		return res.status(200).send(details);
	} catch (e) {
		return res.status(409).send(e.message);
	}
});

fileRouter.delete("/deleteUpload/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const details = await fileModel.findByIdAndDelete(id);
		return res.status(200).send(details);
	} catch (e) {
		return res.status(409).send(e.message);

	}
});

module.exports=fileRouter