-- MySQL dump 10.13  Distrib 8.0.15, for Linux (x86_64)
--
-- Host: localhost    Database: rentdb
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'rentdb'
--
/*!50003 DROP FUNCTION IF EXISTS `haversine` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `haversine`(
        lat1 FLOAT, lon1 FLOAT,
        lat2 FLOAT, lon2 FLOAT
     ) RETURNS float
    NO SQL
    DETERMINISTIC
    COMMENT 'Returns the distance in degrees on the Earth\n             between two known points of latitude and longitude'
BEGIN
    RETURN DEGREES(ACOS(
              COS(RADIANS(lat1)) *
              COS(RADIANS(lat2)) *
              COS(RADIANS(lon2) - RADIANS(lon1)) +
              SIN(RADIANS(lat1)) * SIN(RADIANS(lat2))
            ));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_users` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_users`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `build_email_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `build_email_list`(INOUT email_list varchar(4000))
BEGIN
 
 DECLARE v_finished INTEGER DEFAULT 0;
        DECLARE v_email varchar(100) DEFAULT "";
 
 
 DEClARE email_cursor CURSOR FOR 
 SELECT answer FROM answers;
 
 
 DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET v_finished = 1;
 
 OPEN email_cursor;
 
 get_email: LOOP
 
 FETCH email_cursor INTO v_email;
 
 IF v_finished = 1 THEN 
 LEAVE get_email;
 END IF;
 
 
 SET email_list = CONCAT(v_email,";",email_list);
 
 END LOOP get_email;
 
 CLOSE email_cursor;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `go` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `go`(IN radius INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `searcher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-06  1:53:08
