# Dart 基础\_操作符&控制流&异常处理

## 异常处理

Dart 提供了`throw, rethrow, try, catch, on, finally`关键字让开发者抛出和捕获异常

### throw

Dart 提供两个类异常： `Exception`和`Error`， Dart 不仅可以抛出异常，还可以抛出任何不为`null`的对象

```
// 抛出异常
throw FormatException('Expected at least 1 section');

// 抛出不为null的对象
throw 'Out of llamas！';
```

### `catch`和`on`

```
try {
    breedMoreLlamas();
} on OutOfLlamasException {
    // 捕获一个特定异常
    buyMoreLlamas();
} on Exception catch(e){
    // 捕获所有继承自Exception的异常，并拿到异常对象
    print('Unknown exception: $e');
} catch(e){
    // 捕获所有异常
    print('Somethinf really unknow: $e');
}
```

catch 拿到异常的堆栈信息

```
try{
    // ...
} on Exception catch(e){
    //...
} catch(e, s){
    print('Exception details: \n $e');
    print('Stack trace: \n $s');
}
```

### `rethrow`关键字

`on, catch`关键字捕获的异常会停止传播，如果需要异常继续传播，可以使用`rethrow`关键字

```
void misbehave(){
    try {
        dynamic foo = true;
        print(foo++);
    } catch(e){
        print('misbehave() partially handled ${e.runtimeType}.')
        rethrow;
    }
}
void main(){
    try{
        misbehave();
    } catch(e){
        print('main() finish handling ${e.runtimeType}.');
    }
}
```

### `finnaly` 不管是否抛出异常`finally`都一定会执行

```
try{
    breedMoreLlamas();
}  catch(e){
    print('Error: $e');
} finally{
    // 就算抛出异常（程序中断执行），finnaly也会执行
    cleanLlamaStalls();
}
```
