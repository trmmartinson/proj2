var db = require("../models");
var rentor = require("../views/rentor");
var rentee = require("../views/rentee");
var sequelize = require("sequelize");
var path = require('path');
var util = require('util');
var cow;
var pig;


module.exports = function (app, passport) {
  // Load index page

  app.get('/', function (req, res) {
    console.log("htmlroutes get root");
    res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/choices', isLoggedIn, function (req, res) {
    console.log("you are logged in");
    res.render('choices');
    //res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.get('/matchesold', function (req, res) {
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

  app.get('/signup', function (req, res) {
    res.render('signup', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/signin', function (req, res) {
    res.render('signin', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.get('/successful', function (req, res) {
    res.render('successful', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })
  app.get('/matches',isLoggedIn, function (req, res) {
    //select answers.answer from answers where question_code = "radius" and user_id = 129;
    console.log("/test(html)" + req.user.id);
    db.answer.findOne({
      where: {
        user_id: req.user.id,
        question_code: "radius"
      }
    }).then(function (dbrentee) { 
      let mysql = require('mysql2');
      //let config = require('./config.js');
      let locconfig = {
        host    : 'localhost',
        user    : 'root',
        password: 'test',
        database: 'rentdb'
      };
      
 
      let connectioncall = mysql.createConnection(locconfig);
 
      //let sql = `CALL searcher(555,329)`;
      let sql_s = "call searcher(" + dbrentee.answer + "," + req.user.id + ");";
      console.log("sql_s =" + sql_s);

      connectioncall.query(sql_s, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        console.log(results[0]);
        var tabledata = JSON.stringify(results);
             console.log("tabledata is:");
             console.log(tabledata);
             var foo = JSON.stringify(results);
             var tr = JSON.stringify(results.TextRow);
             console.log("foo");
             console.log(foo);
             console.log("----tr:");
             console.log(tr);
             foo = JSON.stringify(results[0]);
             res.render('matches', { pretty: true, title: 'Hey', message: foo })
             connectioncall.close();
      });

      
    }); 
    
    /*
    
      {
      console.log("mathces, id:" + req.user.id  + " radius:" + dbrentee.answer)
      db.sequelize
        .query('CALL searcher (:radius, :theid)',
          { replacements: { radius: parseInt(dbrentee.answer),theid: parseInt(req.user.id), } })
        .then(function (thedata) {
             console.log("----thedata:");
             console.log(thedata);
             console.log("----textrow:");
             console.log(dbrentee.TextRow);
             //for grid start with city, miles

             var tabledata = JSON.stringify(thedata);
             console.log("tabledata is:");
             console.log(tabledata);
             var foo = JSON.stringify(tabledata);

             res.render('matches', { pretty: true, title: 'Hey', message: foo })

        });
    })  */



  });



  app.get('/rentor', function (req, res) {
    console.log("htmlroutes get rentor");
    //console.log('mycode' + rentor.mycode)
    res.render('rentor', { pretty: true, mycode: rentor.mycode })
  })

  app.get('/rentee', function (req, res) {
    console.log("htmlroutes get this is the rentee screen!");
    //console.log('mycode' + rentor.mycode)
    res.render('rentor', { pretty: true, mycode: rentee.mycode })
  })
  /* del jun
  app.get('/signin', function (req, res) {
    console.log("htmlrouts get signin");
    res.sendFile(path.join(__dirname + "/signin.html"));
  }) */


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
      console.log("yutyut html:" + util.inspect(req.user.firstname + req.user.lastname + "   id:" + req.user.id ));
      console.log("ystringa html:" + JSON.stringify(res.session));

      return next();
    }

    res.redirect('/signinloginfail');
  }

};