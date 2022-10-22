const jwt = require("jsonwebtoken");
require('dotenv').config
const { UnauthenticatedError, BadRequestError } = require("../errors");


module.exports = (req, res, next) => {
  const authentication = req.headers.authorization;
  if (!authentication || !authentication.startsWith("Bearer")) {
    throw new BadRequestError("invalid token");
  }

  const token = authentication.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const { name, userId } = decoded;
    req.user = { name, userId };
    next()
  } catch (e) {
    console.log(e);
    throw new UnauthenticatedError("unauthenticated user access denied");
  }
};
