use rentdb;
DROP PROCEDURE IF EXISTS go;

DELIMITER ||
CREATE PROCEDURE go()
BEGIN

DECLARE done INT DEFAULT FALSE;
DECLARE a INT;
DECLARE b, c INT;
DECLARE cur1 CURSOR FOR SELECT answer from answers;
DECLARE cur2 CURSOR FOR SELECT user_id from dorky;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;


DROP TEMPORARY TABLE IF EXISTS dorky;
CREATE TEMPORARY TABLE dorky AS  
select ranswers.user_id, ranswers.answer as "ranswer",uszips.city,
     round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS miles,
      "        " as newcol
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
   having miles < 10
   order by miles;

open cur2;

  read_loop: LOOP
    FETCH cur2 INTO a;
    IF done THEN
      LEAVE read_loop;
    END IF;
    IF a = 32 then
       delete from dorky where user_id = a;
    end if;

  END LOOP;


close cur2;

update dorky set newcol = "food";

SELECT * FROM dorky;
END
||
