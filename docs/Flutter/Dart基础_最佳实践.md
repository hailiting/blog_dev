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