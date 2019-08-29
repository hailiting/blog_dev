# Dart类Class_继承_多态(二)
## 静态构造函数 
如果类产生的对象永远不会改变，可以让这些对象成为编译时常量。为此，需要定义一个const构造函数并确保所有 实例变量都是  final的
~~~
class ImmutablePoint {
    final num x;
    final num y;
    const ImmutablePoint(this.x,this.y);
    static final ImmutablePoint origin = const ImmutablePoint(0,0);
}
~~~
## 命名构造函数
使用命名构造函数可以为一个类声明多个构造函数，或者说是提供额外声明
~~~
class Point {
    num x;
    num y;
    Point(this.x, this.y);

    // 命名构造函数
    Point.fromJson(Map json){
        x = json('x');
        y = json('y');
    }
}
~~~
构造函数不能被继承，子类不会继承构造函数。如果想子类继承父类中声明的命名构造函数，则必须在子类中实现该构造函数。
#### 调用非默认的父类的构造函数
默认情况下，子类构造函数会调用父类的无参数构造函数。如果父类没有构造函数，则必须手动调用父类的构造函数中的一个。在冒号后、构造函数之前指定父类的构造函数（如果有的话）
~~~
class Person {
    Person.fromJson(Map data){
        print('in Person');
    }
}
class Employee extends Person{
    // Person 没有默认构造函数；
    // 必须调用 super.fromJson(data)
    Employee.fromJson(Map data):super.formJson(data){
        print('in Employee');
    }
}
main(){
    var emp = new Employee.fromJson({});
}
~~~
## 工厂构造函数
为了返回一个之前已经创建的缓存对象                            
当实现使用factory关键词修饰的构造函数时，这个构造函数不必创建类的新实例。例如，工厂构造函数可以从缓存返回实例，或者他可能返回子类的实例。
~~~
class Logger {
    final String name;
    bool mute = false;
    // _cache私有库
    static final Map<String, Logger> _cache = <String, Logger>{},
    // 工厂构造函数不能用this
    factory Logger(String name){
        if(_cache.containsKey(name)){
            return _cache[name];
        } else {
            final logger =  new Logger._internal(name);
            _cache[name] = logger;
            return logger;
        }
    }
    logger._internal(this.name);
    void  log(String msg){
        if(!mute){
            print(msg);
        }
    }
}


var logger = new Logger('UI');
logger.log('Button clicked');
~~~
## 命名工厂构造方法 factory[类名+.+方法名]
不需要将final变量作为参数
class Student{
    ...
    factory Student.stu(Student.stu){
        return Student(stu._school, stu.name, stu.age);
    }
}

