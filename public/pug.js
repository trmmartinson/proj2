
const pug = require('pug');
s = `
     <div>
        <h1> test </h1>
     </div>`;
// Compile the source code
const compiledFunction = pug.compileFile('template.pug',{ pretty : true });

// Render a set of data
console.log(compiledFunction({
  name: 'Timothy',
  mycode: '<div> <h1>dorky</h1></div>'
}));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes',
  mycode: '<div> <h1>dorky</h1></div>'
}));
// "<p>Forbes's Pug source code!</p>"
