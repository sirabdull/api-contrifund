require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "keep-secret-secure123#";

const authorization = async (req, res, next) => {
  const { Authorisation } = req.headers;
  if (!Authorisation) {
    res.status(401).send({
      status: false,
      message: "Unauthorized Access1",
    });
  } else {
    const tokenSplit = Authorization.split(" ");
    jwt.verify(tokenSplit[1], jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: false,
          message: "Unauthorized Acesss",
        });
      }
      req.params.userData = decoded;
      next();
    });
  }
};

module.exports = authorization;
