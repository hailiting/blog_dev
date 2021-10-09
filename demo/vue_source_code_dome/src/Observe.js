function defineReactive(vm, key, val) {
  var dep = new Dep();
  Object.defineProperty(vm, key, {
    get: function() {
      // 添加订阅者watcher到主题对象Dep
      // js浏览器单线程特性，保证整个全局变量在同一时间只会有同一个监听器使用
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 作为发布者发出通知
      dep.notify();
    },
  });
}
function observe(obj, vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key]);
  });
}
