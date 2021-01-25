# CSS3D 的应用

## 摇一摇

```js
var speed = 30; // speed;
var x = (y = z = lastX = lastY = lastZ = 0);
function deviceMotionHandler(eventData) {
  var acceleration = event.accelerationIncludingGravity;
  x = acceleration.X;
  y = acceleration.Y;
  z = acceleration.Z;
  if (
    Math.abs(x - lastX) > speed ||
    Math.abs(y - lastY) > speed ||
    Math.abs(z - lastZ) > speed
  ) {
    /// 简单的摇一摇触发代码
    alert(1);
  }
}
```
