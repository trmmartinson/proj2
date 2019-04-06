db = require("../models/answers");

db.Answer.create({  
          user_id: 1,
          version: 1,
          source: "rentor",
          question_code:  "key",
          answer: "req.body[keya]"
        })
        .then(newUser => {
          console.log(`New user has been created.`);
        }); 
