# babel7
babel 7 版本一般都是以``@babel``开头
~~~
...
  "scripts": {
    "build": "babel src -d lib",
  }
...
  "devDependencies": {
    "@babel/cli": "^7.10.1",
    "@babel/core": "^7.10.2",
    "@babel/plugin-transform-runtime": "^7.10.1",
    "@babel/preset-env": "^7.10.2"
  }
...
~~~
~~~
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
~~~