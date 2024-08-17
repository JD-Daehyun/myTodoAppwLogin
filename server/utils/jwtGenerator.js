const jwt = require("jsonwebtoken");
//allow us to get access to all of our environment variables
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, process.env.jwt_secret, { expiresIn: 60 * 60 });
}


module.exports = jwtGenerator;