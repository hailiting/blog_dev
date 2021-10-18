// 正在使用AST是应用
// 1. postcss cssnext -> css
// 2. webpack loader es6 -> ast - es5
// 3. vue template -> html ast -> vdom
// 4. v8 写的JS代码 词法分析 语法分析 ast -> 执行
// 5. ast + 设计模式  发布订阅
const acorn = require("acorn");
const walk = require("acorn-walk");
const MagicString = require("magic-string");

const source = "console.log(1); const a=20";
const result = acorn.parse(source);
const code = new MagicString(source);
// babel loader
walk.simple(result, {
  Literal(node) {
    console.log(`Found a literal: ${node.value}`);
  },
  // 接口类型  注入
  VariableDeclaration(node) {
    console.log("🏃🏻‍♀️", node);
    const { start } = node;
    code.overwrite(start, start + 5, "var");
    console.log(code);
  },
});
console.log(code.toString());

// console.log(result);
// Node {
//   type: 'Program',
//   start: 0,
//   end: 26,
//   body: [
//     Node {
//       type: 'ExpressionStatement',
//       start: 0,
//       end: 15,
//       expression: [Node]
//     },
//     Node {
//       type: 'VariableDeclaration',
//       start: 16,
//       end: 26,
//       declarations: [Array],
//       kind: 'const'
//     }
//   ],
//   sourceType: 'script'
// }
