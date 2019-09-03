# Dart基础_泛型
## List<...>
常用的泛型名称E、T、S、K、V，这些字母本身没有意义，只是可读性和协作方面有优势                                 
E => Element                                 
T => Type                                
K => key                                
V => value                                
## 为什么使用泛型
* 1，指定泛型类型，可以使代码更安全，提高代码的可读性；
~~~
var names = new List<String>();
names.addAll(['Seth','Kathy','Lars']);
// 检查模式编译失败，生产模式编译成功
names.add(42);
~~~
* 2，使用泛型可以避免代码重复。提高解决类、接口、方法的复用性、以及对不特定数据类型的支持
~~~
//  T是自定义类型的占位符
abstract class Cache<T> {
    T getByKey(String key);
    setByKey(String key, T value);
}


main(List<String> args){
    TestGeneric asdfsd= TestGeneric();
    asdfsd.start();
}
class TestGeneric {
    void start(){
        Cache<String>cache1 = Cache();
        // cache1.setItem('cache1',11); // err
        cache1.setItem('cache1','11'); // ok
        String string1 = cache1.getItem('cache1');
        print(string1);
        Cache<int>cache2 = Cache();
        cache2.setItem('cache1',12); // ok
    }
}
class Cache<T>{
    static final Map<String, Object> _cached = Map();
    void setItem(String key, T value){
        _cached[key]= value;
    }
    T getItem(String key){
        return _cached[key];
    }
}
=>
// 接口缓存对象
abstract class ObjectCache {
    Object getByKey(String key);
    setByKey(String key, Object value);
}
// 只是String接口
abstract class StringCache {
    String getByKey(String key);
    setByKey(String key, String value);
}
// ...
main(List<String> args){
    // 指定了String，就不能在add 1
    Cache<String> strList = Cache<String>();
    strList.add('a');
    strList.add(1);
}
~~~
### 使用集合文字
List,Map文字可以参数化。
~~~
// <type>用于列表
var names=<String>['123','adad','asdad'];
// <keyType, valueType>用于映射
var pages = <String, String>{
    'index.html':'homepagw',
    'robots.txt':'Hints for web r',
    ...
}
~~~
### 使用带构造函数的参数化类型
可以检查 泛型集合及其包含的类型
~~~
var names = List<String>();
names.addAll(['setcg','karrch','sdf']);
var nameSet = Set<String>.from(names);
// 可以检查 泛型集合及其包含的类型
print(nameSet is List<String>); // true

// 创建一个具有整形键和类型视图的映射
var views = Map<int, View>();
~~~
### 限制参数化类型
用``extend``来实现
~~~
class Foo<T extends SomeBaseClass>{
    String toString()=> "Instance of 'Foo<$T>'";
}
class Extender extends SomeBaseClass{
    ...
}
~~~
可以使用SomeBaseClass或它的任何子类作为通用参数
~~~
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
~~~
也可以不指定通用参数
~~~
var someBaseClassFoo = Foo();
~~~
指定其他非SomeBaseClass类型将导致错误
~~~
var foo = Foo<Object>(); // err
~~~
## 使用泛型的方法
~~~
T first<T>(List<T> ts){
    T tmp = ts[0];
    return tmp;
}

~~~