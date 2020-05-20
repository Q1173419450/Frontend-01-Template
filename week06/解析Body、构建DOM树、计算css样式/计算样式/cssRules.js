const css = require('css');
let rule = [];

module.exports.cssRules = function cssRules (text) {
  console.log(text);
  let ast = css.parse(text);
  console.log(JSON.stringify(ast, null, "     "));
  rule.push(...ast.stylesheet.rules);
}

// export function cssRules (text) {
//   console.log(text);
//   let ast = css.parse(text);
//   console.log(JSON.stringify(ast, null, "     "));
//   rule.push(...ast.stylesheet.rules);
// }