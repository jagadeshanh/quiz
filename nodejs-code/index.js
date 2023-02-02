const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
var bodyParser = require("body-parser");
const authRoute = require("./routes/user.route");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("./routes/user.route", router);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// Route Middlewares
app.use("/api", authRoute);

// router.post("/api/register", userController.authenticateToken);

// app.get("/", (req, res, next) => {
//   res.send("I am Backend running in node js");
// });

// app.post("/login", (req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ success: true }));
// });

// app.post("/register", (req, res, next) => {
//   res.send(JSON.parse("{success: true}"));
// });

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
