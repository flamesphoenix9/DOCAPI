const { StatusCodes } = require("http-status-codes")
const Document = require("../models/document");

const adminView = async (req, res) => {
    const { id } = req.body
    try {
        if (id) {
            const documents = await Document.find({ uploadedBy: id }).lean();
            return res.status(StatusCodes.OK).json({ documents, count: documents.length })
        }
        const documents = await Document.find().lean();
        return res.status(StatusCodes.OK).json({ documents, count: documents.length })
    } catch (error) {
        console.error(error)
        req.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something went wrong"})
    }
}

module.exports = { adminView };