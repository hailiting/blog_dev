# HTMLCollection 和 NodeList 有什么区别

## Node 和 Element

- DOM 是一棵树，所有节点都是 Node
- Node 是 Element 的基类
- Element 是其他 HTML 元素的基类，如 HTMLDivElement

```html
<p id="p1">
  <b>Node</b>
  vs
  <em>element</em>
  <!-- 注释 -->
</p>

<script>
  const p1 = document.getElementById("p1");
  console.log(p1.children instanceof HTMLCollection);
  console.log(p1.children instanceof NodeList);

  console.log(p1.childNodes instanceof NodeList);

  // 基类
  class Node {}
  // document
  class Document extends Node {}
  class DocumentFragment extends Node {}
  // 文本和注释
  class CharacterData extends Node {}
  class Comment extends CharacterData {}
  class Text extends CharacterData {}

  // elem
  class Element extends Node {}
  class HTMLElement extends Element {}
  class HTMLDivElement extends HTMLElement {}
  class HTMLInputElement extends HTMLElement {}
</script>
```

## HTMLCollection 与 NodeList

- HTMLCollection 是 Element 集合
- NodeList 是 Node 集合
- 获取 Node 和 Element 的返回结果可能不一样
- 如：elem.childNodes 和 elem.children 不一样
- 前者会包含 Text 和 Comment 节点，或者不会
- HTMLCollection 与 NodeList 都不是数组，而是“类数组”，本质是一个对象
  ```js
  // 类数组转为数组
  const arr1 = Array.from(list);
  const arr2 = Array.prototype.slice.call(list);
  const arr3 = [...list]; // 解构
  ```
