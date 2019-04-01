
class multi_form {
    constructor(form_id, title, action) {
        this.form_id = form_id;
        this.title = title;
        this.action = action;
        this.tab_title = [];
        this.tab_content = [];
    }
    add_tab(tab_title, tab_content) {
        this.tab_title.push(tab_title);
        this.tab_content.push(tab_content);
    }
    show() {
        console.log(this.tab_content.length);
        console.log("rut:" + this.tab_content);
    }
    gen_html() {
        let html_s = `
           <form id="${this.form_id}" class="tab_form" action="${this.action}">
           <h1>${this.title}</h1>
        `;
        for (let x = 0; x < this.tab_content.length; x++) {
            let tmp_title = this.tab_title[x];
            let tmp_content = this.tab_content[x];
            html_s = html_s + `
                <div class="tab">${tmp_title}
                    ${tmp_content}
                </div>
                `;
        }
        html_s = html_s + `
            <div style="overflow:auto;">
                <div style="float:right;">
                  <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
                  <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
                </div>
            </div>
            ` ;
        html_s = html_s + `<div style="text-align:center;margin-top:40px;"> `;
        //circles below the box
        for (let x = 0; x < this.tab_content.length; x++) {
            html_s = html_s + ` <span class="step"></span>`;
        }
        html_s = html_s + `</div>`;
        html_s = html_s + `</form>`;
        return html_s;
    }
}
var doy = new multi_form("formid", "the title", "/api/roomor");
doy.add_tab("title1", `   
    <p><input placeholder="First name..." oninput="this.className = ''" name="fname1"></p>
    <p><input placeholder="Last name..." oninput="this.className = ''" name="lname1"></p>`); 
doy.add_tab("title2", `  
     <p><input placeholder="First name..." oninput="this.className = ''" name="fname2"></p>
     <p><input placeholder="Last name..." oninput="this.className = ''" name="lname2"></p>`); 
doy.add_tab("title3", `    <p><input placeholder="First name..." oninput="this.className = ''" name="fname3"></p>
     <p><input placeholder="Last name..." oninput="this.className = ''" name="lnamee"></p>`); 
//doy.show();
console.log(doy.gen_html());

/*
<form id="regForm" action="/action_page.php">
  <h1>Register:</h1>


  <!-- One "tab" for each step in the form: -->


  <div class="tab">Name:
    <p><input placeholder="First name..." oninput="this.className = ''" name="fname"></p>
    <p><input placeholder="Last name..." oninput="this.className = ''" name="lname"></p>
  </div>


  <div class="tab">Contact Info:
    <p><input placeholder="E-mail..." oninput="this.className = ''" name="email"></p>
    <p><input placeholder="Phone..." oninput="this.className = ''" name="phone"></p>
  </div>
  <div class="tab">Birthday:
    <p><input placeholder="dd" oninput="this.className = ''" name="dd"></p>
    <p><input placeholder="mm" oninput="this.className = ''" name="nn"></p>
    <p><input placeholder="yyyy" oninput="this.className = ''" name="yyyy"></p>
  </div>
  <div class="tab">Login Info:
    <p><input placeholder="Username..." oninput="this.className = ''" name="uname"></p>
    <p><input placeholder="Password..." oninput="this.className = ''" name="pword" type="password"></p>
  </div>
 <div style="overflow:auto;">
    <div style="float:right;">
      <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
      <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
    </div>
  </div>
  <!-- Circles w hich indicates the steps of the form: -->
  <div style="text-align:center;margin-top:40px;">
    <span class="step"></span>
    <span class="step"></span>
    <span class="step"></span>
    <span class="step"></span>
  </div>
</form>

*/