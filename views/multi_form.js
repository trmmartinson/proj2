
module.exports = class multi_form {
    constructor(form_id, title, action,method) {
        this.form_id = form_id;
        this.title = title;
        this.action = action;
        this.method = method;
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
           <form id="tab_form" method="${this.method}" action="${this.action}">
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
//        html_s = html_s + '<script src="w3multiform.js"></script>';
        return html_s;
    }
}

//var doy = new multi_form("formid", "the title", "/api/roomor");
//doy.add_tab("title1", `   
    //<p><input placeholder="First name..." oninput="this.className = ''" name="fname1"></p>
    //<p><input placeholder="Last name..." oninput="this.className = ''" name="lname1"></p>`); 
//doy.add_tab("title2", `  
     //<p><input placeholder="First name..." oninput="this.className = ''" name="fname2"></p>
     //<p><input placeholder="Last name..." oninput="this.className = ''" name="lname2"></p>`); 
//doy.add_tab("title3", `    <p><input placeholder="First name..." oninput="this.className = ''" name="fname3"></p>
     //<p><input placeholder="Last name..." oninput="this.className = ''" name="lnamee"></p>`); 
//console.log(doy.gen_html());
