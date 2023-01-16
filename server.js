const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
require("./app/database/connection/conn");
const passport = require("passport");

app.use(cors());
dotEnv.config({ path: "./config.env" });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/jsonß
app.use(bodyParser.json());

// passportjs initializetion
app.use(passport.initialize());
require("./app/middlewares/Passport")(passport);

///////\\\\\\

app.use("/auth", require("./app/routers/Auth.routes"));
app.use("/api/v1/admin", require("./app/routers/Admin.routes"));
app.use("/api/house", require("./app/routers/HouseInfo.routes"));
app.use("/api/renter", require("./app/routers/Renter.routes"));
app.use("/api/apartment", require("./app/routers/Apartment.routes"));
app.use("/api/bill", require("./app/routers/Bill.routes"));
app.use("/api/post", require("./app/routers/Post.routes"));

///////\\\\\\

app.get("/", (req, res) => {
  res.json({
    message: "hello server",
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on Port ${port}`);
});
