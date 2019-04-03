var multi_form = require('./multi_form.js');
var doy = new multi_form("formid", "RENTEE title", "/api/rentee","POST");
doy.add_tab("title1", `   
    <p><input placeholder="ZIP code ..." oninput="this.className = ''" name="zipcode"></p>`);
doy.add_tab("title1", `   
    <p><input placeholder="radius..." oninput="this.className = ''" type = "number" name="radius"></p>`);
/*
doy.add_tab("Create Account", `    <p><input placeholder="Email..." type="text" oninput="this.className = ''" name="email"></p>
     <p><input placeholder="First name..." oninput="this.className = ''" type="text" name="firstname"></p>
     <p><input placeholder="Last name..." oninput="this.className = ''" type = "text" name="lastname"></p>
     <p><input placeholder="Password..." oninput="this.className = ''" type="text" name="password"></p>`); */

module.exports.mycode = doy.gen_html();
