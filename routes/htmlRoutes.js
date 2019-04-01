var db = require("../models");
var rentor = require("../views/rentor");
var rentee = require("../views/rentee");
var path = require('path');


module.exports = function (app, passport) {
  // Load index page

  app.get('/', function (req, res) {
    console.log("htmlroutes get root");
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/dashboard', isLoggedIn, function (req, res) {
    console.log("you are logged in");
    res.render('rentor', { pretty: true, mycode: rentee.mycode })
    //res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.get('/matches', function (req, res) {

    db.user.findOne({
      where: {
        id: 37  //req.params.id
      }
    }).then(function (dbrentee) {
      console.log("got retntee:")
      console.log(JSON.stringify(dbrentee));
      var sql_s = "select ranswers.user_id, ranswers.answer as 'ranswer',uszips.city, "
          + "round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS distance_in_miles "
          + "from uszips, uszips as zip2,  answers, answers as ranswers "
          + "where " 
          + "uszips.zip = ranswers.answer  "
          + "and " 
          + "zip2.zip = answers.answer "
          + "and "
          + "(answers.source = 'rentee' "
          + "and answers.user_id = ? "
          + "and answers.question_code = 'zipcode') "
          + "and (ranswers.source = 'rentor' "
          + "and  ranswers.question_code = 'zipcode') "
          + "order by distance_in_miles";
      console.log(sql_s);
      db.sequelize.query(sql_s, 
        { replacements: [dbrentee.id], type: sequelize.QueryTypes.SELECT }
      ).then(ziphits => {
        console.log(ziphits)
      })
      //res.json(JSON.stringify(dbuser));
    });



    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })


  app.get('/success', function (req, res) {
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.get('/rentor', function (req, res) {
    console.log("htmlroutes get rentor");
    //console.log('mycode' + rentor.mycode)
    res.render('rentor', { pretty: true, mycode: rentor.mycode })
  })

  app.get('/rentee', function (req, res) {
    console.log("htmlroutes get rentor");
    //console.log('mycode' + rentor.mycode)
    res.render('rentor', { pretty: true, mycode: rentee.mycode })
  })
  app.get('/signin', function (req, res) {
    console.log("htmlrouts get signin");
    res.sendFile(path.join(__dirname + "/signin.html"));
  })


  /*  app.get("/", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        console.log("render rout root");
        res.render("index", {
          msg: "Welcome!",
          examples: dbExamples
        });
      });
    }); */
  /*
    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
        res.render("example", {
          example: dbExample
        });
      });
    });
  */
  // Render 404 page for any unmatched routes
  /*
  app.get("*", function(req, res) {
    res.render("404");
  });*/


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      //console.log("yutyut:" + util.inspect(req.user.firstname + req.user.lastname));
      //console.log("ystring:" + JSON.stringify(res.session));

      return next();
    }

    res.redirect('/signin');
  }

};