const express = require("express");
const cors = require("cors");
const http = require("http");
const dotEnv = require("dotenv");
require("./app/database/connection/conn");
const passport = require("passport");

const app = express();
const server = http.createServer(app);

//socket.io initializetion

const io = require("socket.io")(server);
global.io = io;

app.use(cors());
dotEnv.config({ path: "./config.env" });

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// parse application/jsonß
app.use(express.json({ limit: "50mb" }));

// passportjs initializetion
app.use(passport.initialize());
require("./app/middlewares/Passport")(passport);

///////************************End Points Start******************************\\\\\\

app.use("/api/v1/auth", require("./app/routers/Auth.routes"));

app.use("/api/v1/admin", require("./app/routers/admin/Admin.routes"));
app.use("/api/v1/admin/houses", require("./app/routers/admin/Houses.routes"));
app.use(
  "/api/v1/admin/owners",
  require("./app/routers/admin/OwnersAdmin.routes")
);
app.use(
  "/api/v1/admin/renters",
  require("./app/routers/admin/RentersAdmin.routes")
);
app.use(
  "/api/v1/admin/apartments",
  require("./app/routers/admin/ApartmentsAdmin.routes")
);
app.use(
  "/api/v1/admin/bills",
  require("./app/routers/admin/BillsAdmin.routes")
);

app.use("/api/v1/owner", require("./app/routers/Owner.routes"));
app.use("/api/v1/apartment", require("./app/routers/Apartment.routes"));
app.use("/api/v1/renter", require("./app/routers/Renter.routes"));
app.use("/api/v1/bill", require("./app/routers/Bill.routes"));
app.use("/api/v1/dashboard", require("./app/routers/Dashboard.routes"));
app.use("/api/v1/post", require("./app/routers/Post.routes"));
app.use("/api/v1/map", require("./app/routers/Map.routes"));
app.use("/api/v1/messenger", require("./app/routers/Messenger.routes"));

///////************************End Points End******************************\\\\\\

app.get("/", (req, res) => {
  res.json({
    message: "hello server",
  });
});
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`server is running on Port ${port}`);
});
