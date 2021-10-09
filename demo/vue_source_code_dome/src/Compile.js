function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragement(node, vm);
    return this.$frag;
  }
}
Compile.prototype = {
  nodeToFragement: function(node, vm) {
    var self = this;
    var frag = document.createDocumentFragment();
    var child;
    while ((child = node.firstChild)) {
      self.compileElement(child, vm);
      frag.append(child);
    }
    return frag;
  },
  compileElement: function(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    console.log(node);
    // 节点类型为元素
    if (node.nodeType === 1) {
      var attr = node.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        // 获取v-model绑定的属性名
        var name = attr[i].nodeValue;
        node.addEventListener("input", function(e) {
          // 给对应的data赋值，进而触发该属性的set方法
          vm[name] = e.target.value;
        });
        new Watcher(vm, node, name, "value");
      }
    }
    // 节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        // 获取匹配到的字符串
        var name = RegExp.$1;
        name = name.trim();
        new Watcher(vm, node, name, "nodeValue");
      }
    }
  },
};
