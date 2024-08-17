const express = require("express");
const app = express();
const cors = require('cors');
const jwtAuthRouter = require('./routes/jwtAuth');
const dashBoardRouter = require('./routes/dashboard');
const PORT = process.env.PORT || 4001;

//middlewares for parsing response body and allowing front and back to be connected through different localhost port
app.use(express.json());
app.use(cors());

//routes


//register and login routes to jwtAuth
app.use('/auth', jwtAuthRouter);

//dashboard route
app.use('/dashboard', dashBoardRouter);

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
