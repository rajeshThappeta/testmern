//create mini exp app
const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const User = require("./models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");
userApp.use(exp.json());

require("dotenv").config();
//DEFINE ROUTES

//create user
userApp.post(
  "/create-user",
  expressAsyncHandler(async (req, res) => {
    //get newUserObj from req
    let newUserObj = req.body;

    console.log(newUserObj);
    //verify dupliacte user
    let user = await User.findOne({ username: newUserObj.username });
    //if user found
    if (user !== null) {
      res.send({ message: "User existed" });
    }
    //if user not existed
    else {
      //hash the password
      let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
      //replace password
      newUserObj.password = hashedPassword;
      //create new doucment
      let userDoc = new User(newUserObj);
      //save to db
      await userDoc.save();
      //send res
      res.send({ message: "User created" });
    }
  })
);

//login user
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //get user obj from req
    let userCredentialsObj = req.body;
    //search username
    let userOfDb = await User.findOne({
      username: userCredentialsObj.username,
    });
    //if user not found
    if (userOfDb === null) {
      res.send({ message: "Invalid username" });
    }
    //if user found
    else {
      //compare passwords
      let status = await bcryptjs.compare(
        userCredentialsObj.password,
        userOfDb.password
      );
      //if passwords not matched
      if (status === false) {
        res.send({ message: "Invalid password" });
      }
      //if passwords are matched
      else {
        //create jwt token
        let jwtToken = jwt.sign(
          { username: userCredentialsObj.username },
          process.env.SECRET_KEY,
          { expiresIn: 200 }
        );

        //send token
        res.send({ message: "success", token: jwtToken, payload: userOfDb });
      }
    }
  })
);
//udpate user
//get user data
//delete user

//private route
userApp.get("/private-1",verifyToken,(req,res)=>{
  res.send({message:"Response of private route-1"})
});

//export
module.exports = userApp;
