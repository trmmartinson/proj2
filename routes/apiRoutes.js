var authController = require("../controllers/authcontroller.js");

var db = require("../models");
var util = require("util");
module.exports = function (app, passport) {
  app.post(
    "/api/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/choices",
      failureRedirect: "/signup"
    })
  );

  app.post(
    "/api/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/choices",
      failureRedirect: "/signin"
    })
  );

  app.post("/api/rentor", isLoggedIn, function (req, res) {
    db.rentor.create({
      user_id: req.user.id,
      zipcode: req.body.zipcode,
      loc_description: req.body.loc_description,
      age: req.body.age,
      age_min: req.body.age_min,
      age_max: req.body.age_max,
      values_level: req.body.values_level,
      price: req.body.price,
      gender: req.body.gender,
      gender_opt: req.body.gender_opt
    });
    res.redirect("/successful");
  });

  app.post("/api/rentee", isLoggedIn, function (req, res) {
    db.rentee.create({
      user_id: req.user.id,
      zipcode: req.body.zipcode,
      radius: req.body.radius,
      loc_description: req.body.loc_description,
      age: req.body.age,
      age_min: req.body.age_min,
      age_max: req.body.age_max,
      price_min: req.body.price_min,
      price_max: req.body.price_max,
      values_level: req.body.values_level,
      price: req.body.price,
      gender: req.body.gender,
      gender_opt: req.body.gender_opt
    });
    console.log("rentee sporks");
    res.redirect("/matches");
  });

  function isLoggedIn(req, res, next) {
    console.log("isauth---------------------" + req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signinloginfail");
  }
};
