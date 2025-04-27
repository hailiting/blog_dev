# Flutter 基础 ExpansionTile

```dart
const ExpansionTile({
  Key key,
  this.leading, // 标题左侧要展示的widget
  tilePadding:, // EdgeInsets.zero
  @required this.title, // 要展示的标题widget
  this.backgroundColor, // 背景
  this.onExpansionChanged, // 列表展开收起的回调函数
  this.children = const <Widget>[], // 列表展开时显示的widget
  this.trailing, // 标题右侧要展示的widget
  this.initiallyExpanded = false, // 是否默认状态下展开
})
```
