use rentdb;

select ranswers.user_id, ranswers.answer as "ranswer",uszips.city,
     round(69*haversine(uszips.lat,uszips.lng, zip2.lat, zip2.lng),0) AS distance_in_miles,
      "" as newcol
 from uszips, uszips as zip2,  answers, answers as ranswers
      /*  uszips as rentorzip, uszips as renteezip */
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
   order by distance_in_miles;

