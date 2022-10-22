// const { CustomAPIError , } = require("../errors");
const { StatusCodes } = require("http-status-codes");
module.exports = (err, req, res, next) => {
  console.log(req.url);
  console.log(err.message);



  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }


  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }

  
  // if (err instanceof CustomAPIError) {
  //   res.status(err.statusCode).json({ error: err });
  // }

res.status(customError.statusCode).json({ error: customError.msg });
};
