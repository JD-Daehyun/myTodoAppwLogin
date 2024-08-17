const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
  // try{
  //     //Step 1: destructure from the fetch request
  //     const jwtToken = req.header('token');
  //     if(!jwtToken){
  //         return res.status(403).json('You are not authorize1');
  //     }
  //     //checking if the token is valid
  //     const payload = jwt.verify(jwtToken, process.env.jwtSecret);
  //     //can use req.user in the routes now
  //     //const payload = {
  //     //user: user_id,
  //     // };
  //     req.user = payload.user;
  //     next();

  // }catch(err){
  //     console.error(err.message);
  //     return res.status(403).json('You are not authorize2');
  // }

  const token = req.header("token");
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(token, process.env.jwt_secret);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("You are not authorize");
  }
};

module.exports = authorization;
