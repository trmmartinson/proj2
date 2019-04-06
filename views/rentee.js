var multi_form = require('./multi_form.js');
var questions = new multi_form("formid", "Find a place to live", "/api/rentee", "POST");
questions.add_tab("", ` 
    <p>These questions help us locate people in your area<p>
    <h3>Where do you want to live?<h3>
    <p><input placeholder="ZIP code ..." oninput="this.className = ''" name="zipcode"></p>
    <h3>Enter maximum distance<h3>
    <p><input placeholder="Maximum distance in miles from this zipcode" oninput="this.className = ''"  type = "number" name="radius"></p>`);
questions.add_tab("What is your Age?", `   
    <p>To get the maximum matches it is encrouaged to leave the age range at the default<p>
    <h3>What is your age?<h3>
    <p><input placeholder="Enter age in years" oninput="this.className = ''" type = "number" name="age"></p>
    <h3>What is the youngest room mate you would consider?<h3>
    <p><input placeholder="Enter minimum age" oninput="this.className = ''" type = "number" value="18" name="age_min"></p>
    <h3>What is the oldest room mate you would consider?<h3>
    <p><input placeholder="Enter maximum age in years" oninput="this.className = ''" type = "number" value="100" name="age_max"></p>
    
    `);
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
    <h3>Price Range</h3>
    <p>You are encouraged to leave price at 1 to get the most matches.  Some people might have a mininum</p>
    <h3>Minimum Price</h3>
    <p><input placeholder="Minimum price " oninput="this.className = ''" type="number" value="1" name="price_min"></p>
    <h3>Maximum Price</h3>
    <p><input placeholder="Maximum price " oninput="this.className = ''" type="number" name="price_max"></p>`);
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


`);

console.log("foo");
module.exports.mycode = questions.gen_html(); 
