const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log("Database is not connected");
  });
