const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req,res,next) => {
  console.log(req.headers)
  //get token from header of req
  let token = req.headers.authorization;
  //check token existance
  if (token === undefined) {
    res.send({ message: "Unauthorized request..please login to continue.." });
  }
  //if token is there
  else {
    //verify token
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      next()
    } catch (err) {
      next(err)
    }
  }
};

module.exports = verifyToken;
