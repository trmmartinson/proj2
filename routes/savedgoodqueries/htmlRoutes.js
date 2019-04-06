var db = require("../models");
var rentor = require("../views/rentor");
var rentee = require("../views/rentee");
var sequelize = require("sequelize");
var path = require('path');
var cow;
var pig;


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
    var the_user;
    var zip_list;
    var rentor_answers = "scope";
    var rentee_answers;
    var zip_index = 0;
    var ids = [];
    var lookup;
    db.user.findOne({
      where: {
        id: 40  //req.params.id
      }
    }).then(function (dbrentee) {
      console.log("got retntee:")
      var sql_s = "select ranswers.user_id, ranswers.answer as 'ranswer',uszips.city, "
        + "round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS distance_in_miles " + "from uszips, uszips as zip2,  answers, answers as ranswers " + "where " + "uszips.zip = ranswers.answer  " + "and " + "zip2.zip = answers.answer "
        + "and "
        + "(answers.source = 'rentee' "
        + "and answers.user_id = ? "
        + "and answers.question_code = 'zipcode') "
        + "and (ranswers.source = 'rentor' "
        + "and  ranswers.question_code = 'zipcode') "
        + "order by distance_in_miles";
      //..console.log(sql_s);
      db.sequelize.query(sql_s,
        { replacements: [dbrentee.id], type: sequelize.QueryTypes.SELECT }
      ).then(ziphits => {
        console.log("zzzzzzzzzlen" + ziphits.length); // is 7, need to loop thru each
        //console.log(ziphits);    //perhaps store this in a object for later use?
        // console.log("is this in scope?" + JSON.stringify(dbrentee));
        //..console.log("answers for rentor:::" + ziphits.user_id[j]);
        for (j = 0; j < ziphits.length; j++) {
          console.log("j is " + j);
          console.log("looking up:" + ziphits[j].user_id);
          lookup = ziphits[j].user_id; console.log("len" + ziphits.length + "id" + ziphits);
          db.answer.findAll({
            where: { user_id: lookup }, raw: true
          }).then(rentor_ans => {
            //rentor_answers = rentor_ans[0].user_id;
            console.log("sug   " + rentor_ans[0].user_id);
            ids[j] = rentor_ans[0].user_id;
            cow = rentor_ans[0].user_id;
            console.log(rentor_ans[1].answer);
            console.log(rentor_ans[2].answer);
            //console.log("inloop----------------------------------------"); 
            /* console.log("enny" + rentor_ans.length); console.log("0 enny" + rentor_ans[0].answer); console.log("1 enny" + rentor_ans[1].answer); console.log("2 enny" + rentor_ans[2].answer);
                                  console.log(JSON.stringify(rentor_ans[0]));
            //rentor_answers[j] += rentor_ans; */

          });
        }


        console.log("her dya ar11-----------------------------------------------------------------" + pig);

      })
      console.log("her dya ar22-----------------------------------------------------------------" + pig);
      //res.json(JSON.stringify(dbuser));
      console.log("0zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" + pig);
    });


    console.log("1ast zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz" + pig);
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })


  app.get('/success', function (req, res) {
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/test',isLoggedIn, function (req, res) {
    //select answers.answer from answers where question_code = "radius" and user_id = 129;

    db.answer.findOne({
      where: {
        user_id: req.user.user_id,
        question_code: "radius"
      }
    }).then(function (dbrentee) {
      db.sequelize
        .query('CALL go (:radius)',
          { replacements: { radius: parseInt(dbrentee.answer), } })
        .then(v => console.log(v));

      res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
    })
  });



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
    console.log("isauth---------------------" + req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("yutyut:" + util.inspect(req.user.firstname + req.user.lastname));
      console.log("ystring:" + JSON.stringify(res.session));

      return next();
    }

    res.redirect('/signin');
  }

};