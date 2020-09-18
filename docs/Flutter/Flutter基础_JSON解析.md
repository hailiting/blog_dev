# JSON 解析

## 如何序列化

### 大型项目

插件 `json_serializable`, `built_value`;

### 小型项目

```
String jsonStr = '{"icon": "",title: "", url: "", statusBarColor: "", hideAppBar:""}';
Map<String, dynamic> map = JSON.decode(jsonStr);
CommonModel model = CommonModel.fromJson(map);
print('icon: ${model.icon}');
print('title: ${model.title}');

class CommonModel{
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;
  CommonModel({
    this.icon, this.title, this.url, this.statusBarColor, this.hideAppBar
  });
  factory CommonModel.fromJson(Map<String, dynamic> json){
    return CommonModel(
      icon: json['icon'],
      title: json['title'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar'],
    );
  }
}
```

> 这样就可以明确知道 model 中有哪些字段了

### 解析复杂 JSON

```
{
  "url": "XXX",
  "tabs": [
    {
      "labelName": "推荐",
      "groupChannelCode": "tourphono_global11"
    },
    {
      "labelName": "推荐02",
      "groupChannelCode": "tourphono_global22"
    },
  ]
}
// 解析
class TravelTabModel{
  final String url;
  final List<TravelTab> tabs;
  TravelTabModel({this.url, this.tabs});
  factory TravelTabModel.fromJson(Map<String, dynamic> json){
    String url = json['url'];
    if(json['tabs'] != null){
      List<TravelTab> tabs = new List<TraveTab>();
      json['tabs'].forEach((v){
        tabs.add(new TravelTab.fromJson(v));
      });
      // tabs = (json['tabs'] as List).map((i) => TravelTab.fromJson(i)).toList();
      return TravelTabModel(url: url, tabs: tabs);
    }
  }
}
class TravelTab {
  String labelName;
  String groupChannelCode;
  TravelTab({this.labelName, this.groupChannelCode});
  TravelTab.fromJson(Map<String, dynamic> json){
    labelName = json['labelName'];
    groupChannelCode = json['groupChannelCode'];
  }
}
```
