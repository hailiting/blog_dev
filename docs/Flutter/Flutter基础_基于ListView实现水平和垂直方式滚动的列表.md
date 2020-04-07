# Flutter基础_基于ListView实现水平和垂直方式滚动的列表
##  如何实现垂直滚动列表
~~~
import 'package:flutter/material.dart';
void main() => runApp(MyApp());
const CITY_NAMES = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19'];
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        final title = "Basic List";
        return MaterialApp(
            title: title,
            home: Scaffold(
                appBar: AppBar(
                    title: Text(title),
                ),
                body: ListView(
                    children: _buildList(),
                )
            )
        );
    }
    List<Widget> _buildList(){
        return CITY_NAMES.map((city)=>_item(city)).toList();
    }
    Widget _item(String city){
        return Container(
            height: 80,
            margin: EdgeInsets.only(bottom: 5),
            alignment: Alignment.center,
            decoration: BoxDecoration(color: Colors.teal),
            child: Text(
                city,
                style: TextStyle(color: Colors.white, fontSize: 20),
            )
        );
    }
}
~~~
## 如何实现水平滚动列表
~~~
import 'package:flutter/material.dart';
void main() => runApp(MyApp());
const CITY_NAMES = ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19'];
class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
        final title = '水平';
        return MaterialApp(
            title: title,
            home: Scaffold(
                appBar: AppBar(
                    title: Text(title),
                ),
                body: Container(
                    height: 200,
                    child: ListView(
                        scrollDirection: Axis.horizontal,
                        child: _buildList(),
                    )
                )
            )
        );
    }
    List<Widget> _buildList(){
        return CITY_NAMES.map((city)=>_item(city)).toList();
    }
    Widget _item(String city){
        return Container(
            width: 160,
            margin: EdgeInsets.only(right:  5),
            alignment: Alignment.center,
            decoration: BoxDecoration(color: Colors.teal),
            child: Text(
                city,
                style: TextStyle(color: Colors.white, fontSize: 20),
            )
        );
    }
}
~~~
