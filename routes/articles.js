const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// Bring in Models
let Article = require("../models/article")

// Add Route
router.get("/add", function(req, res){
  res.render("add_article", {
    title: "Add Articles"
  });
});

// Load Edit Form
router.get("/edit/:id", function(req, res){
  Article.findById(req.params.id, function(err, article){
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
  check('author').isLength({min:1}).trim().withMessage('Author required'),
  check('body').isLength({min:1}).trim().withMessage('Body required')
 ],
 (req,res,next)=>{

    let article = new Article({
      title:req.body.title,
      author:req.body.author,
      body:req.body.body
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('add_article',
      {
        article:article,
        errors: errors.mapped()
      });
    } else {
      article.title = req.body.title;
      article.author = req.body.author;
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
    res.render("article", {
      article: article
    });
  });
});

// Delete an Article
router.delete("/:id", function(req, res){
  let query = {_id: req.params.id}
  Article.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send("Success");
  })
});

module.exports = router;
