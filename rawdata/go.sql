use rentdb;
DROP PROCEDURE IF EXISTS go;

DELIMITER ||
CREATE PROCEDURE go(IN radius INT)
BEGIN

DECLARE done INT DEFAULT FALSE;

DECLARE fuser_id INT;
declare franswer char(20);
declare fcity char(30);
declare fmiles INT;
declare fnewcol char(20);

DECLARE b, c INT;

DECLARE cur2 CURSOR FOR SELECT user_id, ranswer, city, miles, newcol from dorky;

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
   having miles < radius
   order by miles;

open cur2;

  read_loop: LOOP
    FETCH cur2 INTO fuser_id, franswer, fcity,fmiles,fnewcol;
    IF done THEN
      LEAVE read_loop;
    END IF;
    if franswer = "55423" then
        update dorky set city = "Richfield" where user_id = fuser_id;
    end if;
    IF fuser_id = 32 then
       delete from dorky where user_id = fuser_id;
    end if;

  END LOOP;


close cur2;

update dorky set newcol = "food";

SELECT * FROM dorky;
END
||
