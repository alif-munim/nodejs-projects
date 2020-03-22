const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// Article Model
let Article = require("../models/article")
// User Model
let User = require("../models/user");

// Add Route
router.get("/add", ensureAuthenticated, function(req, res){
  res.render("add_article", {
    title: "Add Articles"
  });
});

// Load Edit Form
router.get("/edit/:id", ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id) {
      req.flash("danger", "Not authorized");
      res.redirect("/");
    }
    res.render("edit_article", {
      title: "Edit Article",
      article: article
    });
  });
});

// Add Submit POST Route
// With Express Validator
router.post('/add',
 [
  check('title').isLength({min:1}).trim().withMessage('Title required'),
  // check('author').isLength({min:1}).trim().withMessage('Author required'),
  check('body').isLength({min:1}).trim().withMessage('Body required')
 ],
 (req,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('add_article',
      {
        article:article,
        errors: errors.mapped()
      });
    } else {
      let article = new Article();
      article.title = req.body.title;
      article.author = req.user._id;
      article.body = req.body.body;

      article.save(err=>{
        if(err)throw err;
        req.flash('success','Article Added');
        res.redirect('/');
      });
    }
});

// Add Edit POST Route
router.post("/edit/:id", function(req, res){
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
      req.flash("success", "Article Updated")
      res.redirect("/");
    }
  });
});


// Get Single Article
router.get("/:id", function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render("article", {
        article: article,
        author: user.name
      });
    })

  });
});

// Delete an Article
router.delete("/:id", function(req, res){

  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id: req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send("Success");
      });
    }
  });


});

// Access control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
