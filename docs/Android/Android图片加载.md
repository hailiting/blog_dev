# Android 图片加载

## Picasso

```java
Picasso.get().load("https://example.com/image.jpg").into(imageView);
```

## Glide

提供高效的图片加载和缓存功能，支持 GIF, WebP, 缩略图, 占位符等功能

```java
Glide.with(context).load("https://example.com/image.jpg").into(imageView)
```

- Glide 在内存管理方面更加优秀
- Glide 支持更多的图片格式
- Glide 提供预加载，自适应尺寸，并发加载等，以提供更快的图片加载体验
- Glide 提供更多的缓存策略
  - 三级存储：内存 文件 数据库

## Coil

```java
Coil.load(context, "https://example.com/image.jpg", imageView);
```
