const jwt = require("jsonwebtoken");
const { jwt_token } = require("../config");

module.exports.verifyUserToken = (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    // console.log(token);
    // console.log(jwt_token);
    jwt.verify(token, jwt_token, (err, decoded) => {
      //   console.log(err);
      if (err) {
        return res.status(401).send({ message: "Unauthorized Token!" });
      }
      req.userId = decoded.id;
      req.token = token;
      next();
    });
    // req.user = decoded;
    // console.log(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
