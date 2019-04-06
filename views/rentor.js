var multi_form = require('./multi_form.js');
var questions = new multi_form("formid", "Find a roomate to live with me", "/api/rentor","POST");


questions.add_tab("", `   
    <h3>Where will be living?<h3>
    <p><input placeholder="ZIP code ..." oninput="this.className = ''" type="number" name="zipcode"></p>
    <h3>Enter a description</h3>
    <p><input oninput="this.className = ''"  placeholder="Downtown Centerview highrise near planetarium" type = "text" name="loc_description"></p>`);

questions.add_tab("", `

    <p>To get the maximum matches it is encrouaged to leave the age range at the default<p>
    <h3>What is your age?<h3>
    <p><input placeholder="Enter age in years" oninput="this.className = ''" type = "number" name="age"></p>
    <h3>What is the youngest room mate you would consider?<h3>
    <p><input placeholder="Enter minimum age" oninput="this.className = ''" type = "number" value="18" name="age_min"></p>
    <h3>What is the oldest room mate you would consider?<h3>
    <p><input placeholder="Enter maximum age in years" oninput="this.className = ''" type = "number" value="100" name="age_max"></p>`
    
     );

questions.add_tab("", `
<h3>Social Compatibility</h3>
    <p>This question is to help you locate someone who is socially liberal or conservative</p>
    <p>When you see matches you will only see people who similar (+/- 1) to your choice.</p> 
    <p>Keep in mind that this is intended only as a guide.  You will need to discuss lifestyle choices with your potential roommate
    <p>Here are some guidelines:<p>
    <ol> 
         <li>Goody Two Shoes: This person is socially conservative.  May wach only rated 'G' movies, probably does not drink, etc</li>
         <li>Normal to Conservative: May wach only rated 'PG13' movies, almost never swears </li>
         <li>Middle of the road: May wach only rated 'PG13' movies, almost never swears </li>
         <li>Normal to Liberal: Likes rated 'R' movies, might drink occationally </li>
         <li>Anything Goes: I would not ask details, but you should if you consider yourself one of these individuals! </li>
    </ol>
    <h3>Select:</h3>
    <select name="values_level">
       <option value="1">1. Goody Two Shoes</option>
       <option value="2">2. Normal to Conservative.</option>
       <option value="3">3. Middle of the Road</option>
       <option value="4">4. Normal to Liberal</option>
       <option value="5">5. Anything Goes</option>
    </select>

      `);
questions.add_tab("", `   
    <h3>What price do you plan on charging?<h3>
    <p><input placeholder="Enter price... " oninput="this.className = ''" type="number" name="price"></p>`);
questions.add_tab("", `   
<div>
     <h3>What is your gender?</h3>
   <select name="gender">
     <option value="M">Male</option>
     <option value="F">Female</option>
   </select>
</div>
<div>
   <h3>Which do you prefer?</h3>
   <p>You will receive more results if you chose "Does not matter"</p>
   <select name="gender_opt"> 
       <option value="N">Does not matter</option>
       <option value="S">I would only chose to live with a person of same gender</option>
   </select>
</div>
`
     );



module.exports.mycode = questions.gen_html();
