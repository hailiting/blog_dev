const { read } = require("fs");

if (typeof registerPaint !== "undefined") {
  registerPaint(
    "background-canvas",
    class {
      static get inputProperties() {
        return ["--background-canvas"];
      }
      paint(ctx, geom, properties) {
        eval(properties.get("--background-canvas").toString())(
          ctx,
          geom,
          properties
        );
      }
    }
  );
}
// html
// <style>
// body:before{
//   --star-sky: 1;
//   background-image: paint(yd-sky);
// }
// </style>
// sky.js
// class YdSky {
//   static get inputProperties() {
//     return ["--star-sky"];
//   }
//   paint(ctx, geom, properties) {
//     const starSky = properties.get("--star-sky");
//     //
//   }
// }
// registerPaint("yd-sky", YdSky);

// 手动注册
// CSS.registerProperty({
//   name: "--stop-color",
//   syntax: "<color>",
//   inherits: false,
//   initialValue: "rgba(0,0,0,0)",
// });
// CSS.unregisterProperty("--stop-color");
// 使用
// .button{
//   --stop-color: read;
//   background: linear-gradient(var(--stop-color), black);
//   transition: --stop-color 1s;
// }
// .button:hover{
//   --stop-color: green;
// }

// CSS.px(42 );
