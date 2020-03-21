const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const config = require("./config/database")
const passport = require("passport");

mongoose.connect(config.database);
let db = mongoose.connection;

// Check Connection
db.once("open", function(){
  console.log("Connected to MongoDB");
});

// Check for DB Errors
db.on("error", function(err){
  console.log(err);
});

// Initialize App
const app = express();

// Bring in Models
let Article = require("./models/article")

// Load View Engine (Pug)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")))

// Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "KnowledgeBase",
        articles: articles
      });
    }
  });
});

// Route Files
let articles = require("./routes/articles");
let users = require("./routes/users");
app.use("/articles", articles)
app.use("/users", users)

// Start Server
app.listen(3000, function(){
  console.log("Server running on port 3000!")
});
