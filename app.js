const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/nodekb");
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

// Get Single Article
app.get("/article/:id", function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render("article", {
      article: article
    });
  });
});


// Add Route
app.get("/articles/add", function(req, res){
  res.render("add_article", {
    title: "Add Articles"
  });
});

// Load Edit Form
app.get("/article/edit/:id", function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render("edit_article", {
      title: "Edit Article",
      article: article
    });
  });
});

// Add Submit POST Route
app.post("/articles/add", function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

// Add Edit POST Route
app.post("/articles/edit/:id", function(req, res){
  let article = {}
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

app.delete("/article/:id", function(req, res){
  let query = {_id: req.params.id}
  Article.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send("Success");
  })
})

// Start Server
app.listen(3000, function(){
  console.log("Server running on port 3000!")
});
