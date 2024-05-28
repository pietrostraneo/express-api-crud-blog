const express = require("express");
const router = express.Router();

const postController = require('../controllers/post.js');

const multer = require("multer");
const uploader = multer({ dest: "public" });

router.post('/', uploader.single('image'), postController.create);



module.exports = router;