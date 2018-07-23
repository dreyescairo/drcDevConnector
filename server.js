//require the express module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//*************************ROUTES************************* */
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//*************************EXPRESS INIT()************************* */
const app = express();

//*************************BODY-PARSER************************* */
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//*************************DATABASE************************* */

//dbconfig
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log("***ERROR***: " + err));

//*************************PASSPORT************************* */

//passport middleware
app.use(passport.initialize());
//passport config
require("./config/passport.js")(passport);

//*************************USE ROUTES************************* */

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port `, port));
