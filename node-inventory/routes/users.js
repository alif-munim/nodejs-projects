const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Bring in User Model
let User = require("../models/user");

// Register Form
router.get("/register", function(req, res){
  res.render("register");
});

// Register Process
router.post('/register',
 [
  check('name').isLength({min:1}).trim().withMessage('Name required'),
  check('email').isLength({min:1}).trim().isEmail().withMessage('Valid email required'),
  check('username').isLength({min:1}).trim().withMessage('Username required'),
  check('password').isLength({min:1}).trim().withMessage('Password required'),
  check('password2').isLength({min:1}).trim().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  })
 ],
 (req,res,next)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.redirect("/users/register");
    } else {

      let user = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
      });

      bcrypt.genSalt(10, function(err, salt){
        if(err) {
          console.log(err);
          res.redirect("users/register");
          return;
        }
        bcrypt.hash(user.password, salt, function(err, hash){
          if(err) {
            console.log(err);
            res.redirect("users/register");
            return;
          }
          user.password = hash;
          console.log(user.password);

          user.save(err=>{
            if(err)throw err;
            req.flash('success','Registered');
            res.redirect('/users/login');
          });

        });
      });


    }
});

// Login form
router.get("/login", function(req, res){
  res.render("login");
});

// Login Process
router.post("/login", function(req, res, next){
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/users/login");
})

module.exports = router
