require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

/* trm added passprt, session, bodyparser */
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')

var exphbs     = require('express-handlebars')  //get rid of this if there is time
/* end added passprt */



var db = require("./models");



var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
//trm was extended false originally 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// trm For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
 


// Handlebars
/*
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
); */
app.set("view engine", "pug");

// Routes
require("./routes/apiRoutes")(app,passport);
require("./routes/htmlRoutes")(app,passport);

// trme load passport strategies, db.user was models.user
require('./config/passport.js')(passport,db.user);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}



var syncOptions = { force: true };
db.sequelize.sync({syncOptions}).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
