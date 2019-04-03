use rentdb;

DROP PROCEDURE IF EXISTS all_users;

DELIMITER ||
CREATE PROCEDURE all_users()
BEGIN


DROP TEMPORARY TABLE IF EXISTS dorky;
CREATE TEMPORARY TABLE dorky AS  

select ranswers.user_id, ranswers.answer as "ranswer",uszips.city,
     round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS miles,
      "         " as newcol
 from uszips, uszips as zip2,  answers, answers as ranswers
 where
   uszips.zip = ranswers.answer 
   and 
   zip2.zip = answers.answer 
   and 
   (answers.source = "rentee"
   and answers.id = 37 
   and answers.question_code = 'zipcode')
   and (ranswers.source = "rentor"
   and  ranswers.question_code = 'zipcode')
   having miles < 100
   order by miles;
update dorky set  newcol = "food";

SELECT * FROM dorky;
END
||
