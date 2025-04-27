```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';

enum Version {
  lazy,
  wait
}
// Cmd-line args/Env vars: https://stackoverflow.com/a/64686348/2301224
const String version = String.fromEnvironment('VERSION');
const Version running = version == "lazy" ? Version.lazy : Version.wait;

void main() async {
  //WidgetsFlutterBinding.ensureInitialized(); // if needed for resources
  if (running == Version.lazy) {
    print('running LAZY version');
    LazyBindings().dependencies();
  }

  if (running == Version.wait) {
    print('running AWAIT version');
    await AwaitBindings().dependencies(); // await is key here
  }

  runApp(MyApp());
}

class LazyBindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MyDbController>(() => MyDbController());
  }
}

/// Simulates a slow (2 sec.) init of a data access object.
/// Calling [await] dependencies(), your app will wait until dependencies are loaded.
class AwaitBindings extends Bindings {
  @override
  Future<void> dependencies() async {
    await Get.putAsync<MyDbController>(() async {
      Dao _dao = await Dao.createAsync();
      return MyDbController(myDao: _dao);
    });
  }
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final MyDbController dbc = Get.find();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('GetX Bindings'),
      ),
      body: Center(
        child: Obx(() => Text(dbc.dbItem.value)),
      ),
    );
  }
}

class MyDbController extends GetxController {
  Dao myDao;

  MyDbController({this.myDao});

  RxString dbItem = 'Awaiting data'.obs;

  @override
  void onInit() {
    super.onInit();
    initDao();
  }

  Future<void> initDao() async {
    // instantiate Dao only if null (i.e. not supplied in constructor)
    myDao ??= await Dao.createAsync();
    dbItem.value = myDao.dbValue;
  }
}

class Dao {
  String dbValue;

  Dao._privateConstructor();

  static Future<Dao> createAsync() async {
    var dao = Dao._privateConstructor();
    print('Dao.createAsync() called');
    return dao._initAsync();
  }

  /// Simulates a long-loading process such as remote DB connection or device
  /// file storage access.
  Future<Dao> _initAsync() async {
    dbValue = await Future.delayed(Duration(seconds: 2), () => 'Some DB data');
    print('Dao._initAsync done');
    return this;
  }
}
```
