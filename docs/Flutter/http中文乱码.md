# http 中文乱码

## 添加头部

```dart
dio.options.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
dio.options.responseType = ResponseType.plain;
```
