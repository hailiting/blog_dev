# web 与端交互逻辑

## web 调取安卓方法：

`window.android.jsFunction()` `jsFunction`是安卓端写好的函数。

## 安卓调取 web

参考项目地址[https://github.com/qq541343996/-APP]

```js
// 在全局注册
window.getLoginUserId = function(userId) {
  if (window.callback != undefined) {
    window.callback.getLoginUserId(userId);
  }
};

window.jsRefresh = function(userId) {
  if (window.callback != undefined) {
    window.callback.jsRefresh(userId);
  }
};
window.setCallback = function(callback) {
  window.callback = callback;
};
class activityDetail extends Component {
  componentWillMount() {
    window.setCallback(this); // 绑定this到 setCallback里
    window.scrollTo(0, 0);
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }
  getLoginUserId=(userId)=>{
    this.setState({
        userId:userId,
    },()=>{
      sessionStorage.setItem("userId",this.state.userId)}
    })
  }
  jsRefresh=(userId)=>{
    sessionStorage.setItem("userId",userId)
    window.location.reload()
  }
}
```
