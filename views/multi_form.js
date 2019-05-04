
module.exports = class multi_form {
    // the html/css behind this code is from w3schools
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
        return html_s;
    }
}
