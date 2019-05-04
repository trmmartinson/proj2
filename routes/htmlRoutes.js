var db = require("../models");
var rentor = require("../views/rentor");
var rentee = require("../views/rentee");
var sequelize = require("sequelize");
var path = require('path');
var util = require('util');

module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/choices', isLoggedIn, function (req, res) {
    res.render('choices');
  })

  app.get('/matches', isLoggedIn, function (req, res) {
    result = [];
    var sql_s =
      "select " +
      "rentees.radius, " +
      "users.firstname, users.email, uszips.city, rentors.loc_description,  " +
      "rentors.values_level - rentees.values_level as val_diff, " +
      "round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS miles " +
      "from " +
      "rentors, rentees, uszips, uszips as zip2, users " +
      "where " +
      "rentees.user_id = ? and " +
      "uszips.zip = rentors.zipcode and " +
      "zip2.zip = rentees.zipcode  and " +
      "users.id = rentors.user_id and  " +
      "rentees.age between rentors.age_min and rentors.age_max and " +
      "rentors.age between rentees.age_min and rentees.age_max AND " +
      "rentors.price between rentees.price_min and rentees.price_max and " +
      "not  (rentees.gender_opt = 'Y' and rentees.gender != rentors.gender) and " +
      "not  (rentors.gender_opt = 'Y' and rentees.gender != rentors.gender) and " +
      "rentors.values_level between rentors.values_level - 1 and rentees.values_level + 1 " +
      "having miles < rentees.radius " +
      "order by miles;";

    db.sequelize.query(sql_s,
      { replacements: [req.user.id], type: sequelize.QueryTypes.SELECT }
    ).then(query_hits => {
      query_hits.forEach(function (rentor_line) {
        let values = "";
        if (rentor_line.val_diff == 0)
          values = "Match";
        else if (rentor_line.val_diff == -1)
          values = "Slighly more conservative";
        else if (rentor_line.val_diff == 1)
          values = "Slightly more liberal";
        result.push({
          miles: rentor_line.miles, first_name: rentor_line.firstname,
          values_level: values, city: rentor_line.city,
          email: rentor_line.email, loc_desc: rentor_line.loc_description
        });
      });
      let foo = JSON.stringify(result);
      res.render('matches', { pretty: true, title: 'Hey', message: foo })
    });


  });

  app.get('/signup', function (req, res) {
    res.render('signup', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/signin', function (req, res) {
    res.render('signin', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.get('/successful', function (req, res) {
    res.render('successful', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })



  app.get('/rentor', function (req, res) {
    console.log("htmlroutes get rentor");
    res.render('rentor', { pretty: true, mycode: rentor.mycode })
  })

  app.get('/rentee', function (req, res) {
    console.log("htmlroutes get this is the rentee screen!");
    //console.log('mycode' + rentor.mycode)
    res.render('rentor', { pretty: true, mycode: rentee.mycode })
  })

  function isLoggedIn(req, res, next) {
    console.log("isauth  htmlrouts isloggedin---------------------" + req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("htmlroutes yutyut html:" + util.inspect(req.user.firstname + req.user.lastname + "   id:" + req.user.id));
      console.log("ystringa html:" + JSON.stringify(res.session));

      return next();
    }

    res.redirect('/signinloginfail');
  }

};