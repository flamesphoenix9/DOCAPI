const express = require('express');
const router = express.Router();

const upload = require("../middleware/upload")
const { uploadDocument, getDocuments } = require('../controllers/document');

router.post("/upload", upload.single('file'), uploadDocument)
router.get("/", getDocuments);

module.exports = router;