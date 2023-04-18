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
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// parse application/jsonß

// app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// app.use(bodyParser.json({ limit: "50mb" }));

// passportjs initializetion
app.use(passport.initialize());
require("./app/middlewares/Passport")(passport);

///////************************End Points Start******************************\\\\\\

app.use("/api/v1/auth", require("./app/routers/Auth.routes"));
app.use("/api/v1/admin", require("./app/routers/Admin.routes"));
app.use("/api/v1/owner", require("./app/routers/Owner.routes"));
app.use("/api/v1/apartment", require("./app/routers/Apartment.routes"));
app.use("/api/v1/renter", require("./app/routers/Renter.routes"));
app.use("/api/v1/bill", require("./app/routers/Bill.routes"));
app.use("/api/v1/dashboard", require("./app/routers/Dashboard.routes"));
app.use("/api/v1/post", require("./app/routers/Post.routes"));
app.use("/api/v1/map", require("./app/routers/Map.routes"));

///////************************End Points End******************************\\\\\\

app.get("/", (req, res) => {
  res.json({
    message: "hello server",
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on Port ${port}`);
});
