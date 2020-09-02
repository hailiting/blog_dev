// 用interface抽象属性类和方法
interface Radio {
  // 类的方法名称
  switchRadio(triggerL: boolean): void;
}
interface Battery {
  checkBatteryStatus();
}
// 接口的继承
interface RadioWithBattery extends Radio, Battery {
  name: string
}


class Car implements Radio {
  switchRadio() {
  }
}

// class Cellphone implements Radio, Battery {
class Cellphone implements RadioWithBattery {
  name: "123";
  switchRadio() {
  }
  checkBatteryStatus() {
  }
}