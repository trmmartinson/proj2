use rentdb;
DROP PROCEDURE IF EXISTS searcher;

DELIMITER ||
CREATE PROCEDURE searcher(IN radius INT,IN rentee_id INT)
BEGIN

DECLARE done INT DEFAULT FALSE;

DECLARE fuser_id INT;
declare franswer char(20);
declare fcity char(30);
declare fmiles INT;
declare fnewcol char(20);

declare delete_id INT;

declare rentee_age char(10);
declare rentee_age_min char(10);
declare rentee_age_max char(10); 
declare rentee_price_min char(10); 
declare rentee_price_max char(10); 
declare rentee_gender char(10); 
declare rentee_gender_pref char(10); 
declare rentee_values_level char(10); 

declare rentor_age char(10);  /* needed */
declare rentor_age_min char(10);
declare rentor_age_max char(10); 

declare rentor_price_min char(10); 
declare rentor_price_max char(10); 
declare rentor_loc_description char(30); 

declare rentor_price char(10); 
declare rentor_gender char(10); 
declare rentor_gender_pref char(10); 

 

DECLARE cur2 CURSOR FOR SELECT user_id, ranswer, city, miles, newcol from rentors;

 


DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
/*
comments are here
here are more

*/
select answer into rentee_age_min from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age_min";  
select answer into rentee_age_max from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age_max";  
select answer into rentee_age from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age";  
select answer into rentee_price_min from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "price_min";  
select answer into rentee_price_max from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "price_max";  
select answer into rentee_gender from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "gender";  
select answer into rentee_gender_pref from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "gender_pref";  
/*
select answer into rentee_values_level from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "values_level";   */



CREATE TEMPORARY TABLE rentors AS  

select ranswers.user_id, ranswers.answer as "ranswer",uszips.city,
     round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS miles,
      "        " as newcol
 from uszips, uszips as zip2,  answers, answers as ranswers
 where ranswers.user_id > 225 and
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
    /*
    select answer into rentor_gender from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "gender";   */
     /*
    select answer into rentor_gender_pref from answers
       where user_id = fuser_id and answers.source = "rentee" and answers.question_code = "gender_pref";   */


    IF done THEN
      LEAVE read_loop;
    END IF;

    select answer into rentor_gender from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "gender";  
    select answer into rentor_gender_pref from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "gender_pref";  
    select answer into rentor_age_min from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "age_min";  
    select answer into rentor_age_max from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "age_max";  
    select answer into rentor_price from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "price";  
    select answer into rentor_loc_description from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "loc_description";  
    if franswer = "55423" then
        update rentors set city = "Richfield" where user_id = fuser_id;
    end if;
    
    IF fuser_id = "41"  then
       delete from rentors where user_id = fuser_id;
    end if;

  END LOOP;


close cur2;

update rentors set newcol = "nerf";

SELECT * FROM rentors;
END
||
