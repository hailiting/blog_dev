# scss 和 less

## less

```less
@base: #f938ab;
.box-shadow(@style, @c) when (iscolor(@c)) {
  box-shadow: @style @c;
  -webkit-box-shadow: @style @c;
  -moz-box-shadow: @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div {
    .box-shadow(0 0 5px, 30%);
  }
}
```

监视模式： `#!watch`

## scss

### `each`

```scss
$size: 40px, 50px, 80px;
@each $size in $sizes {
  .icon-#{$size} {
    // #{} 占位符  $xx 变量
    font-size: $size;
    height: $size;
    width: $size;
  }
}

$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "success": $success,
  "info": $info,
  "warning": $warning,
  "danger": $danger,
  "light": $light,
  "dark": $dark,
);
@each $key, $val in $theme-colors {
  .icon-#{$key} {
    color: $val;
  }
}

$icons: (
  "eye": "\f112",
  "start": "\f12e",
  "stop": "\f12f",
); // map
@each $name, $glyph in $icons {
  .icon-#{$name}: before {
    display: inline-blcok;
    font-family: "Icon font";
    content: $glyph;
  }
}
```
