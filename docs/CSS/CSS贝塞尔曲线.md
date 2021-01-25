# CSS 贝塞尔曲线

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
      .cube {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: yellow;
        animation: hor-animation 2s 0.5s 2;
        animation-timing-function: cubic-bezier(0, 0.77, 0.35, 0.98);
      }
      .wrapper {
        animation: var-animation 2s 0.5s 2;
        animation-timing-function: linear;
      }
      @keyframes hor-animation {
        0% {
          transform: matrix(1, 0, 0, 1, 0, 0);
        }
        100% {
          transform: matrix(1, 0, 0, 1, 400, 0);
        }
      }
      @keyframes var-animation {
        0% {
          transform: matrix(1, 0, 0, 1, 0, 0);
        }
        100% {
          transform: matrix(1, 0, 0, 1, 0, 400);
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="cube"></div>
    </div>
  </body>
</html>
```
