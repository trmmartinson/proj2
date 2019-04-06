CREATE DEFINER=`root`@`localhost` PROCEDURE `searcher`(IN radius INT,IN rentee_id INT)
BEGIN

DECLARE done INT DEFAULT FALSE;

DECLARE fuser_id INT;
declare franswer char(20);
declare fcity char(30);
declare fmiles INT;
declare floc_desc char(20);

declare zap_id INT;
declare values_dif INT;

declare rentee_age INT;
declare rentee_age_min INT;
declare rentee_age_max INT;
declare rentee_price_min INT;
declare rentee_price_max INT;
declare rentee_gender char(10); 
declare rentee_gender_opt char(10); 
declare rentee_values_level INT;

declare rentor_age INT;
declare rentor_age_min INT;
declare rentor_age_max INT;
declare rentor_price_min INT;
declare rentor_price_max INT;
declare rentor_loc_description char(80); 
declare rentor_price INT;
declare rentor_gender char(10); 
declare rentor_gender_opt char(10);  
declare rentor_values_level INT;

declare out_values char(80);
declare out_first char(80);
declare out_email char(80);

 

DECLARE cur2 CURSOR FOR SELECT user_id, ranswer, city, miles, loc_desc from rentors;

 


DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

select cast(answer as unsigned) into rentee_age_min from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age_min";  
select cast(answer as unsigned) into rentee_age_max from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age_max";  
select cast(answer as unsigned) into rentee_age from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "age";  
select cast(answer  as unsigned) into rentee_price_min from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "price_min";  
select cast(answer as unsigned)  into rentee_price_max from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "price_max";  
select answer into rentee_gender from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "gender";  
select answer into rentee_gender_opt from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "gender_opt";   
select cast(answer as unsigned)  into rentee_values_level from answers
  where user_id = rentee_id and answers.source = "rentee" and answers.question_code = "values_level";  



CREATE TEMPORARY TABLE rentors AS  

select ranswers.user_id, ranswers.answer as "ranswer",uszips.city,
     round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS miles,
      "loc                                                          " as loc_desc, 
      "val                                                   " as values_level,
      "fir                                       " as first_name,
      "email                                     " as email
 from uszips, uszips as zip2,  answers, answers as ranswers
 where ranswers.user_id > 305 and 
   uszips.zip = ranswers.answer 
   and 
   zip2.zip = answers.answer 
   and 
   (answers.source = "rentee"
   and answers.user_id  = rentee_id
   and answers.question_code = 'zipcode')
   and (ranswers.source = "rentor"
   and  ranswers.question_code = 'zipcode')
   having miles < radius
   order by miles;

open cur2;

  read_loop: LOOP
    FETCH cur2 INTO fuser_id, franswer, fcity,fmiles,floc_desc;
   

    IF done THEN
      LEAVE read_loop;
    END IF;
    set zap_id = 0; 
    select answer into rentor_gender from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "gender";  

    select answer into rentor_gender_opt from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "gender_opt";  

    select cast(answer as unsigned) into rentor_age from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "age";  

    select cast(answer as unsigned) into rentor_age_min from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "age_min";  

    select cast(answer as unsigned) into rentor_age_max from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "age_max";  
    select cast(answer as unsigned) into rentor_price from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "price";  
    select answer into rentor_loc_description from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "loc_description";   
    select cast(answer as unsigned)  into rentor_values_level from answers
       where user_id = fuser_id and answers.source = "rentor" and answers.question_code = "values_level";  
    select firstname into out_first from users where id = fuser_id;
    select email into out_email from users where id = fuser_id;

    if (rentor_age < rentee_age_min  or rentor_age > rentee_age_max ) or
       (rentee_age < rentor_age_min  or rentee_age > rentor_age_max ) or
       (rentee_price_min > rentor_price or rentee_price_max < rentor_price)
    then
	set zap_id = fuser_id; 
    end if;  
    if (rentor_gender_opt = "S" or rentee_gender_opt = "S") and
	(rentee_gender <> rentor_gender)
    then
	set zap_id = fuser_id; 
    end if;
    set out_values = "values";

    set values_dif = rentee_values_level - rentor_values_level;
    set out_values = "";
    if (values_dif = 0) then
	   set out_values = "Match";
    elseif (values_dif = 1) then
	   set out_values = "Slightly more liberal";
    elseif (values_dif = -1) then
	   set out_values = "Slightly more conservative";
    else
	   set zap_id = fuser_id;
    end if;
    
    update rentors set loc_desc = rentor_loc_description where user_id = fuser_id;
    update rentors set first_name = out_first where user_id = fuser_id;
    update rentors set email = out_email where user_id = fuser_id;
    update rentors set values_level = out_values where user_id = fuser_id;
    
    IF zap_id <> 0  then
       delete from rentors where user_id = zap_id;
    end if;  

  END LOOP;


close cur2;


SELECT * FROM rentors;
END