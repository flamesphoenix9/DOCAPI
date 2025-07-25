const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err && err.code == "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      msg: `payload too large, max file size is 10MB`
    })
  }
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
  }
  if (err.name === 'CastError') {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No item found with id : ${err.value}` })
  }
  console.error(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong, please try again later.' })
}





module.exports = errorHandlerMiddleware
