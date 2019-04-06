var authController = require('../controllers/authcontroller.js');

var db = require("../models");

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
    successRedirect: '/dashboard',
    failureRedirect: '/signupa.html'
  }
  ));

  app.post('/api/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signinb.html'
  }
  ));

  app.post('/api/rentor', (req, res) => {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) { return res.status(401).json(err); }
      if (user) {
        console.log(JSON.stringify(user));
        delete req.body.password;
        delete req.body.firstname;
        delete req.body.lastname;
        delete req.body.email;
        console.log(JSON.stringify(req.body));
        Object.keys(req.body).map(function (key, index) {

          db.answer.create({
            user_id: user.id,
            source: "rentor",
            question_code: key,
            answer: req.body[key]
          })
            .then(newUser => {
              // console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
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
  })

  app.post('/api/rentee', (req, res) => {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) { return res.status(401).json(err); }
      if (user) {
        console.log(JSON.stringify(user));
        delete req.body.password;
        delete req.body.firstname;
        delete req.body.lastname;
        delete req.body.email;
        console.log(JSON.stringify(req.body));
        Object.keys(req.body).map(function (key, index) {

          db.answer.create({
            user_id: user.id,
            source: "rentee",
            question_code: key,
            answer: req.body[key]
          })
            .then(newUser => {
              // console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
            });

        });
        console.log("sporks");
        res.redirect("/test");
        const token = "tok"; /// user.generateJwt(); 
      } else {
        res.status(401).json(info);
      }
    })(req, res)
  })

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






};
