const {StatusCodes}= require("http-status-codes")
const { BadRequestError } = require("../errors");
const Document = require('../models/document'); 


const uploadDocument = async (req, res) => {
    try {
        const { title } = req.body;
        if (!req.file) {
            throw new BadRequestError("No file uploaded");
        }
        const document = new Document({
            title:title,
            link: req.file.path,
            uploadedBy: req.user.userId,
        })
        await document.save();
        res.status(StatusCodes.OK).json({ message: 'Document uploaded successfully', document})
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error uploading document' });
    }
};

const getDocuments = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const documents = await Document.find().lean();
            return res.status(StatusCodes.OK).json({ documents, count: documents.length })
        }  
        if (req.user.role === "user") {
            const documents = await Document.find({ uploadedBy: req.user.userId }).lean();
            return res.status(StatusCodes.OK).json({ documents, count: documents.length })
        }
    } catch (error) {
        console.error(error)
        req.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong, could not fetch documents"})
    }
}
 
module.exports = { uploadDocument, getDocuments };
