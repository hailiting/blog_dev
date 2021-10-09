// uid for batching
let uid = 0;
function Watcher(vm, node, name, type) {
  // 自己是靶子
  Dep.target = this;
  this.name = name;
  this.id = ++uid;
  this.node = node;
  this.vm = vm;
  this.type = type;
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  update: function() {
    this.get();
    if (!batcher) {
      batcher = new Batcher();
    }
    batcher.push(this);
    // 订阅者执行相应操作
    // this.node[this.type] = this.value;
  },
  // 不堵塞队列
  cb: function() {
    // 订阅者执行相应操作
    this.node[this.type] = this.value;
  },
  get: function() {
    // 触发相应属性的get
    // 因为 vm 绑定了   vm.test -> dep.addSub
    this.value = this.vm[this.name];
  },
};
