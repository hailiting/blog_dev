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

## 3dDome01

![3dDome01](./img/3dDome01.gif)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .wrap {
        box-sizing: border-box;
        margin: 40px auto;
        width: 300px;
        height: 250px;
        /* 弧度的密码 */
        -webkit-border-radius: 60px 5px;
        background-color: #eee;
        overflow: hidden;
        background: gradient(
          linear,
          0% 20%,
          0% 92%,
          from(#fff),
          to(#f3f3f3),
          color-stop(0.1, #fff)
        );
      }
      .view {
        width: 300px;
        height: 170px;
        background-color: royalblue;
        margin-bottom: 20px;
      }
      .view .slice {
        width: 60px;
        height: 100%;
        transform-style: preserve-3d;
        transform-origin: left center;
        transition: transfrom 150ms ease-in-out;
        background-size: 300px 170px;
        background-image: url("./3dDome01.png");
        background-repeat: no-repeat;
      }
      .view .s1 {
        background-position: 0 0;
      }
      .view .s2 {
        background-position: -60px 0;
      }
      .view .s3 {
        background-position: -120px 0;
      }
      .view .s4 {
        background-position: -180px 0;
      }
      .view .s5 {
        background-position: -240px 0;
      }

      .view .s2,
      .view .s3,
      .view .s4,
      .view .s5 {
        transform: translate3d(60px, 0, 0);
      }
      .view:hover .s2 {
        transform: translate3d(59px, 0, 0) rotate3d(0, 1, 0, -45deg);
      }
      .view:hover .s3 {
        transform: translate3d(59px, 0, 0) rotate3d(0, 1, 0, 90deg);
      }
      .view:hover .s4 {
        transform: translate3d(59px, 0, 0) rotate3d(0, 1, 0, -90deg);
      }
      .view:hover .s5 {
        transform: translate3d(59px, 0, 0) rotate3d(0, 1, 0, 90deg);
      }

      .view .overlay {
        width: 60px;
        height: 100%;
        opacity: 0;
        position: absolute;
        transition: opacity 150ms ease-in-out;
      }
      .view:hover .overlay {
        opacity: 1;
      }
      .view .s1 > .overlay {
        background: -webkit-linear-gradient(
          right,
          rgba(0, 0, 0, 0.05) 0,
          rgba(0, 0, 0, 0) 100%
        );
      }
      .view .s2 > .overlay {
        background: -webkit-linear-gradient(
          left,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.2) 100%
        );
      }
      .view .s3 > .overlay {
        background: -webkit-linear-gradient(
          right,
          rgba(0, 0, 0, 0.8) 0,
          rgba(0, 0, 0, 0.2) 100%
        );
      }
      .view .s4 > .overlay {
        background: -webkit-linear-gradient(
          left,
          rgba(0, 0, 0, 0.8) 0,
          rgba(0, 0, 0, 0) 100%
        );
      }
      .view .s5 > .overlay {
        background: -webkit-linear-gradient(
          left,
          rgba(0, 0, 0, 0.3) 0,
          rgba(0, 0, 0, 0) 100%
        );
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="view">
        <div class="slice s1">
          <span class="overlay"></span>
          <div class="slice s2">
            <span class="overlay"></span>
            <div class="slice s3">
              <span class="overlay"></span>
              <div class="slice s4">
                <span class="overlay"></span>
                <div class="slice s5">
                  <span class="overlay"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-box">this is info 📚 🔐</div>
    </div>
  </body>
</html>
```
