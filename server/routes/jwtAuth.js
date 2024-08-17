const jwtAuthRouter = require("express").Router();
const pool = require("../db");
const bycrpt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
//register
jwtAuthRouter.post("/register", validInfo, async (req, res) => {
  try {
    //Step 1: destructure req.body (name, email, password)
    // console.log('Hello?')
    const { name, email, password } = req.body;

    //Step 2: check if the user exist
    //if true then throw error since the user already exist
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      //401 user not authenticated and 403 user not authorized
      return res.status(401).json("Already Exist");
    }

    // res.json(user.rows);

    //Step 3: Bcrypt the user password
    const saltRound = 10;
    const salt = await bycrpt.genSalt(saltRound);
    //await for bycrpt to generate sale and hash it is necessary
    const bycrptPassword = await bycrpt.hash(password, salt);

    //Step 4: Enter the new user inside our database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bycrptPassword]
    ); //returning * returns the data back to us
    // res.json(newUser.rows[0]);

    //Step 5: Generating jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error has occured");
  }
});

//login
jwtAuthRouter.post("/login", validInfo, async (req, res) => {
  try {
    //Step 1: Destructure the req.body
    const { email, password } = req.body;

    //Step 2: Check if the uuser does not exist (if not then we throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    //Step 3: Check if incomming password is the same as the database password //don't forget that bycrpt takes time
    const validpassword = await bycrpt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validpassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    //Step 4: Give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error has occured");
  }
});

//jwt token verify whenever the react application is refreshed
jwtAuthRouter.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error has occured");
  }
});

module.exports = jwtAuthRouter;
