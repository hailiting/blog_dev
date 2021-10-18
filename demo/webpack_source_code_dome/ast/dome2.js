const esprima = require("esprima");
const estraverse = require("estraverse");
const escodegen = require("escodegen");
const code = `const view = {
  a: 2,
  init: () => {
    view.a = 44;
  },
  render() {
    return "aaa";
  },
};
`;
const ast = esprima.parse(code);

estraverse.traverse(ast, {
  enter: function(node) {
    if (node.type === "VariableDeclaration") {
      node.kind = "var";
    }
  },
});
const reg_code = escodegen.generate(ast);
console.log(JSON.stringify(reg_code, null, 4));
