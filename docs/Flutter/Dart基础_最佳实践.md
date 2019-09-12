# Dart基础_最佳实践
## String
### 1, 如果有两个字符串字面量定义（不是变量），而是实际的放到引号内的字符串   =》不用使用+来连接字符串
~~~
// good
raiseAlarm(
    'Error: Parts of the spaceship are on fire. Other '
    'part are overrun by martians. Unclear which are which.'
);
// bad
raiseAlarm(
    'Error: Parts of the spaceship are on fire. Other ' + 
    'part are overrun by martians. Unclear which are which.'
);
~~~
### 2, 使用插值的形式来组合字符串和值
~~~
// good
'Hello, $name! you are ${year - birth} years old.';
// bad
'Hello,'+ name+'! you are '+(year - birth)+' years old.';
~~~
### 3, 避免字符串中使用多余大括号
~~~
// good
'Hi, $name!'
"Wear your wildest $decade's outfit."
'Wear your wildest ${decade}s Outfit.'
// bad
'Hi, ${name}!'
"Wear your wildest ${decade}'s outfit."
~~~
## 集合
Dart天生支持四种集合类型：``lists``,``maps``,``queues``和``sets``。
### 1, 尽量使用
~~~
// good
var points = [];
var address = {};
// bad
var points= new List();
var addresses = new Map();
~~~
也可以提供泛型类型
~~~
// good
var points = <Point>[];
var addresses = <String, Address>{};
// bad
var points = new List<Point>();
var address = new Map<String, Address>{};
~~~
对于集合类的命名构造函数则不适合上面的规则。``List.from()``,``Map.fromIterable()``都有其使用场景。                              
如果需要一个固定长度的结合，使用``new List()``来创建一个固定长度的list也是合理的
### 2，不要使用.length来判断集合是否为空
Dart提供了更高效率和易用的getter函数： ``.isEmpty``和``.isNotEmpty``。
~~~
// god
if(lunchBox.isEmpty) return 'so hungry...';
if(words.isNotEmpty) return words.join(' ');
// bad
if(lunchBox.length == 0)  return 'so hungry...';
if(!words.isNotEmpty) return words.join(' ');
~~~
### 3, 使用高阶``higher-order``函数来转换集合数据
如果现有一个集合并且想要修改里面的内容转换为另一个集合，使用``.map()``、``.where()``以及``Iterable``提供的其他函数让代码更简洁。                            
使用这些函数代替``for``循环会让代码更简洁的表述意图，生成一个新的集合系列并不具有副作用。
~~~
var aquaticNames = animals
        .where((animal)=> animal.isAquatic)
        .map((animal)=> animal.name);
~~~
### 4, 避免在 ``Iterable.forEach()``中使用函数声明形式
~~~
// good
for(var person in people){
    ...
}
// bad 
people.forEach((person){
    ...
})
~~~
如果在每个集合元素上调用一个已经定义好的函数，则可以使用``forEach()``;
~~~
people.forEach(print)
~~~
## 方法
### 要用方法声明的形式来给方法起名字
对于编程语言来说，局部嵌套方法以及闭包是非常有用的。通常是在一个方法中定义另一个方法。在大部分情况下，这些嵌套方法都用做回调函数而且不需要名字。
~~~
// good
void main(){
    localFunction(){
        ...
    }
}
// bad    不是把lamda赋值给一个变量 
void  main(){
    var localFunction =  (){
        ...
    };
}
~~~
### 不要使用lambda表达式来代替tear-off
如果你在一个对象上调用函数并省略了括号，Dart称之为'tear-off'——一个和函数使用同样参数的闭包，当调用他的时候就执行了这个函数
~~~
// good
names.forEach(print);
// bad      不要把函数调用包装为一个lambda表达式
names.forEach((name){
    print(name)
})
~~~
## 变量
### 不要显式的把变量初始化为null
Dart中没有初始化的变量和域会自动初始化为null。Dart中没有’初始化内存’这个概念，所以添加``=null``是多余的。
~~~
// good
int _nextId;
class LazyId{
    int _id;
    int get id{
        if(_nextId ==  null) _nextId = 0;
        if(_id == null) _id = _nextId++;
        return _id;
    }
}
// bad
int _nextId  = null;
...
~~~
### 避免保存可以计算的结果
~~~
// bad  不知道什么时候缓存失效（radius是可变的），需要重新计算
class Circle {
    num radius;
    num area;
    num circumference;
    Circle(num radius)
        :radius = raius,
        area = math.PI*radius*radius,
        circumfarence = match.PI*2.0*radius;
}
~~~
为了避免缓存失败，可这样做：
~~~
class Circle {
    num _radius;
    num get radius =>_radius;
    set radius(num value){
        _radius = value;
        _recalculate();
    }
    num _area;
    num  get area => _area;
    num _circumference;
    num get circumference = _circumference;

    Circle(this._radius){
        _recalculate();
    }

    void _recalculate(){
        _area = math.PI * _radius * _radius,
        _circumference = math.PI * 2.0 * _radius;
    }
}
~~~
上面的代码不利于编写、维护及调试
~~~
class Circle{
    num radius;
    num get area => match.PI * radius*radius;
    num get circumference => math.PI * 2.0* radius;
    Circle(this.radius);
}
~~~
### 省略局部变量的类型
显式的定义局部变量类型会制造视觉噪音
~~~
// good
Map<int, List<Person>> groundByZip(Iterable<Person> people){
    var peopleByZip = <int, List<Person>>{};
    for(var person in people){
        peopleByZip.putIfAbsent(person.zip, ()=><Person>[]);
        peopleByZip[person.zip].add(person);
    }
    return peopleByZip;
}
// bed
Map<int,List<Person>> groupByZip(Iterable<Person> people){
    Map<int, List<Person>> peopleByZip = <int, List<Person>>{};
    for(Person person in people){
        peopleByZip.putIfAbsent(person.zip, ()=><Person>[]);
        peopleByZip[person.zip].add(person);
    }
    return peopleByZip;
}
~~~
## 成员
在Dart中，对象的成员可以是方法(函数)或(实例变量)。
### 不要创建不必要的getter和setter
~~~
// good
class Box{
    var contents;
}
// bad
class Box{
    var _contents;
    get contents => _contents;
    set contents(value){
        _contents = value;
    }
}
~~~
### 使用``final``关键字来限制只读属性
~~~
// good
class Box{
    final contents = [];
}
// bad
class Box{
    var _contents;
    get contents => _contents;
}
~~~
### 用``=>``来实现只有一个单一返回语句的函数
~~~
get width => right - left;
bool ready(num time) => minTime == null || minTime <= time;
containsValue(String value) => getValues().contains(value);
~~~
多行代码尽可能使用普通花括号函数体并使用明显的return语句。
### 不要使用``this.``，除非遇到了变量冲突的情况
只有当局部变量和成员变量名称一样的时候，才需要使用``this.``来访问成员变量。
~~~
class Box{
    var value;
    void clear(){
        update(null);
    }
    void update(value){
        this.value = value;
    }
}
~~~
注意：构造函数参数在初始化列表中从来不会出现参数冲突的情况
~~~
class Box extends BaseBox{
    var value;
    Box(value)
        : value = value,
        super(value)
        {}
}
~~~
### 要尽可能的在定义变量的时候初始化其值
~~~
class Folder{
    final String name;
    final List<Document> contents=[];
    Folder(this.name);
    Folder.temp():name = 'temporary';
}
~~~
对于变量取值依赖构造函数参数以及不同的构造函数取值也不一样的情况，不适用这条实践。
## 构造函数
### 尽可能的使用初始化形式
~~~
class Point{
    num x,y;
    // 这里位于构造函数参数之前的``this.``语法称为初始化形式
    Point(this.x,this.y);
}
~~~
### 不要在初始化形式上定义类型
~~~
// good
class Point{
    int x, y;
    Point(this.x, this.y);
}
// bad
class Point{
    int x, y;
    Point(int this.x, int this.y);
}
~~~
### 要用``;``来替代函数体的构造函数{}
~~~
class Point{
    int x,y;
    Point(this.x,this.y); // bad  Point(this.x, this.y){}
}
~~~
### 要把``super()``调用放到构造函数初始化列表之后调用
~~~
View(Style style,List children)
    :_children = children,
    super(style){}
~~~
## 异常处理
### 避免使用没有on语句的catch
### 不要默默的丢弃该异常信息，记录并显示给用户，或重新抛出
### 使用rethrow来重新抛出捕获的异常
~~~
try{
    somethingRisky();
} catch(e){
    if(!canHandle(e)) rethrow;
    handle(e);
}
~~~
## 异步
### 使用``async/await``，而不是直接使用底层的特性
~~~
// good
Future<bool> doAsyncComputation() async{
    try{
        var result = await longRunningCalculation();
        return verifyResult(result.summary);
    } catch(e){
        log.error(e);
        return false;
    }
}
// bad
Funture<bool> doAsyncComputation(){
    return longRunningCalulation().then((result){
        return verifyReult(result.summary);
    }).catchError((e){
        log.error(e);
        return new Future.value(false);
    })
}
~~~
### 不要在没有有用效果的情况下使用``async``
~~~
// good
Future afterTwoThings(Future first, second){
    return Future.wait([first,second]);
}
// bad
Future afterTwpThings(Future first, second) async{
    return Future.wait([first, second]);
}
~~~
1，使用了await
~~~
Future usesAwait(Future later) async{
    print(await later);
}
~~~
2，抛出一个异常(asymc throw比 return new Future.error(...)更简短)
~~~ 
Future asyncError() async{
    throw 'Error';
}
~~~
3，返回一个值
~~~
Future asyncValue() async{
    return 'value';
}
~~~
### 考虑用高阶函数来转换事件流
### 避免直接使用Completer
~~~
// bad
Future<bool> fileContainsBear(String path){
    var completer = new Completer<bool>();
    new File(path).readAsString().then((contents){
        completer.complete(contents.contains('bear'));
    })
    return completer.future;
}
// good
Future<bool> fileContainsBear(String path) async{
    var contents = await new File(path).readAsString();
    return contents.contains('bear');
}
// or
Futurn<bool> fileContainsBear(String path){
    return new File(path).readAsString().then((contents){
        return contents.contains('bear');
    })
}
~~~

