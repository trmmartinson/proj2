var authController = require('../controllers/authcontroller.js');

var db = require("../models");
var util = require("util");
module.exports = function (app, passport) {
  // Get all examples
  /*
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
 */
  /*
  app.post("/api/signup", function (req, res) {
  //  db.Example.findAll({}).then(function () {
       console.log(JSON.stringify(req.body));
   // });
  }); */


  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/choices',
    failureRedirect: '/signup'
  }
  ));

  /* second copy not needed?
    app.post('/api/signup', passport.authenticate('local-signup', {
      successRedirect: '/choices',
      failureRedirect: '/signupa.html'
    }
    )); */

  app.post('/api/signin', passport.authenticate('local-signin', {
    successRedirect: '/choices',
    failureRedirect: '/signin'
  }
  ));
  /*
    app.post('/api/rentor', (req, res) => {
      passport.authenticate('local-signup', function (err, user, info) {
        if (err) { return res.status(401).json(err); }
        if (user) {
          console.log(JSON.stringify(user));
          //delete req.body.password;
          //delete req.body.firstname;
          //delete req.body.lastname;
          //delete req.body.email;
          console.log(JSON.stringify(req.body));
          Object.keys(req.body).map(function (key, index) {
  
            db.answer.create({
              user_id: user.id,
              source: "rentor",
              question_code: key,
              answer: req.body[key]
            })
              .then(newUser => {
                 console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
              });
            console.log(" rentor key:" + key + " " + req.body[key])
          });
          console.log("sporks");
          res.redirect("/success");
          const token = "tok"; /// user.generateJwt(); 
        } else {
          res.status(401).json(info);
        }
      })(req, res)
    }) */


    app.post('/api/rentor', isLoggedIn, function (req, res) {
      console.log("you are logged in API" + req.body.firstname);
      console.log("yutyut use this one inpostapi:" + util.inspect(req.user.id + req.user.lastname));
      console.log("ystringa inpostapi:" + JSON.stringify(res.session));
      Object.keys(req.body).map(function (key, index) {
        console.log(key)
        db.answer.create({
          user_id: req.user.id,
          source: "rentor",
          question_code: key,
          answer: req.body[key]
        })
          .then(newUser => {
            console.log(`New answer created for for rentor`);
          });
  
      });
      console.log("sporks");
      res.redirect("/successful");
      //res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  app.post('/api/rentee', isLoggedIn, function (req, res) {
    console.log("you are logged in API" + req.body.firstname);
    console.log("yutyut use this one inpostapi:" + util.inspect(req.user.id + req.user.lastname));
    console.log("ystringa inpostapi:" + JSON.stringify(res.session));
    Object.keys(req.body).map(function (key, index) {
      console.log(key)
      db.answer.create({
        user_id: req.user.id,
        source: "rentee",
        question_code: key,
        answer: req.body[key]
      })
        .then(newUser => {
            console.log(`New answer created for for rentee`);
        });

    });
    console.log("sporks");
    res.redirect("/matches");
    //res.render('index', { pretty: true, title: 'Hey', message: 'Hello there!' })
  })

  /* move create out
  app.post('/api/rentee', (req, res) => {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) { return res.status(401).json(err); }
      if (user) {
        console.log(JSON.stringify(user));
        //delete req.body.password;
        //delete req.body.firstname;
        //delete req.body.lastname;
        //delete req.body.email;
        console.log("nerf --------------   smuf" + req.body.password + ":" +  user.body.password + info.body.password);
        console.log(JSON.stringify(req.body));
        Object.keys(req.body).map(function (key, index) {

          db.answer.create({
            user_id: user.id,
            source: "rentee",
            question_code: key,
            answer: req.body[key]
          })
            .then(newUser => {
               console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
            });

        });
        console.log("sporks");
        res.redirect("/dashboard");
        const token = "tok"; /// user.generateJwt(); 
      } else {
        res.status(401).json(info);
      }
    })(req, res)
  }) */

  // Create a new example
  //app.post("/api/rentor", function (req, res) {
  //console.log( "nerf inside post RENTORb4 cut"  );
  //passport.authenticate('local-signup',  { successRedirect: '/dashboard', failureRedirect: '/signup.html'});
  //console.log( "nerf inside post RENTORafter");

  //  Object.keys(req.body).map(function(key, index) {
  //   console.log(" rentor key:" + key + " " +req.body[key] ); 

  /*
  db.Example.create(req.body).then(function (dbExample) {
    Object.keys(req.body).map(function(key, index) {
      //newObject[key] = req.body[key] 
      console.log(" rentor key:" + key + " " +req.body[key] );
  });
      res.redirect("/");
      res.json(dbExample); */
  //}) ;
  //  res.redirect("/");
  //});

  // Create a new example
  app.post("/api/rentee", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      console.log("inside post RENTOR");
      Object.keys(req.body).map(function (key, index) {
        //newObject[key] = req.body[key] 
        console.log(" rentee key:" + key + " " + req.body[key]);
      });
      res.redirect("/");
      //res.json(dbExample);
    });
  });





  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  function isLoggedIn(req, res, next) {
    console.log("isauth---------------------" + req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log("yutyut api:" + util.inspect(req.user.firstname + req.user.lastname));
      console.log("ystringa api:" + JSON.stringify(res.session));

      return next();
    }

    res.redirect('/signinloginfail');
  }




};
