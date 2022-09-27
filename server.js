//create express appclear
const exp = require("express");
const app = exp();
const mongoose = require("mongoose");
const path = require("path");
const productApp = require("./APIs/productApi");
const userApp = require("./APIs/userApi");

require("dotenv").config();

//connect react build with express server
app.use(exp.static(path.join(__dirname, "./build/")));

//connect to database server
mongoose.connect(process.env.DATABASE_URL);

//get default connection
const db = mongoose.connection;

//if err
db.on("error", () => console.log("Error in DB connection ", err));
//if connection success
db.on("open", () => console.log("Database connected"));

//if path is user
app.use("/user", userApp);
app.use("/product", productApp);

//dealing with page refresh
app.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./build/index.html"));
});

//handling invalid paths
app.use((request, response, next) => {
  response.send({ message: `path ${request.url} is invalid` });
});

//error handler
app.use((err, req, res, next) => {
  res.send({ message: "error", payload: err.message });
});

//assign port number
const port = process.env.PORT;
app.listen(port, () => console.log(`Http Server listenning on port ${port}..`));
