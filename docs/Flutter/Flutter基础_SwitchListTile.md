# Flutter 基础 SwitchListTile

## 切换开关

```dart
ListTile(
  title: Text("ListTile"),
  subTitle: Text("Hot and Cold?"),
  leading: Icon(Icons.ac_unit), // 后
  trailing: Fire(), // 前
)


SwitchListTile(
  title: Text("SwitchListTile"),
  subTitle: Text("Hot and Cold?"),
  secondary: Bird(), // 后
  controlAffinity: ListTileControllAffinity.leading, // 控制icon 前后
  value: _toggled,
  onChanged: (bool value){
    setState(()=> _toggled = value);
  },
  activeThumbImage: _birdMode ? NetworkImage(flutter_icon_url) :null
)
```
