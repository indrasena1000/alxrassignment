const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })

const {dashboard,uploadFile} = require("../controllers/user");
const {protect} = require("../middleware/auth");

 router.get("/dashboard",protect,dashboard)
 router.post("/uploadfile",protect,upload.single("file"),uploadFile)

module.exports = router;