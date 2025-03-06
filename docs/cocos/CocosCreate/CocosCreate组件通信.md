# CocosCreate 组件通信

## 1. 节点事件系统

```js
// 发送方
this.node.emit("eventName", data);
// 接收方
this.node.on("eventName", (data) => {
  // 处理数据
});
```

## 2. 全局事件系统

```js
// 发送方
cc.systemEvent.emit("globalEvent", data);
// 接收方
cc.systemEvent.on("globalEvent", (data) => {
  // 处理数据
});
```

## 3. 自定义事件中心

```js
export class EventCenter {
    private static _instance: EventCenter;
    private _eventTarget: cc.EventTarget;

    private constructor() {
        this._eventTarget = new cc.EventTarget();
    }

    public static get instance(): EventCenter {
        if (!this._instance) {
            this._instance = new EventCenter();
        }
        return this._instance;
    }

    public emit(eventName: string, ...args: any[]) {
        this._eventTarget.emit(eventName, ...args);
    }

    public on(eventName: string, callback: Function, target?: any) {
        this._eventTarget.on(eventName, callback, target);
    }

    public off(eventName: string, callback: Function, target?: any) {
        this._eventTarget.off(eventName, callback, target);
    }
}

// 使用方式
EventCenter.instance.emit('customEvent', data);
EventCenter.instance.on('customEvent', this.handleEvent, this);
```

## 4. 直接引用

```js
// 获取其他组件引用
@property(OtherComponent) otherComp: OtherComponent = null;

// 或者通过 getComponent 获取
this.otherComp = this.node.getComponent(OtherComponent);
```

## 5. 单例模式

```js
export class GameManager {
    private static _instance: GameManager = null;

    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    // 数据和方法
    private _gameData: any = {};

    public setData(key: string, value: any) {
        this._gameData[key] = value;
    }

    public getData(key: string) {
        return this._gameData[key];
    }
}

// 使用方式
GameManager.instance.setData('score', 100);
```

## 6. 消息中心模式

```js
export class MessageCenter {
    private static _handlers: Map<string, Function[]> = new Map();

    public static register(msgName: string, handler: Function, target: any) {
        let handlers = this._handlers.get(msgName);
        if (!handlers) {
            handlers = [];
            this._handlers.set(msgName, handlers);
        }
        handlers.push(handler.bind(target));
    }

    public static unregister(msgName: string, handler: Function, target: any) {
        const handlers = this._handlers.get(msgName);
        if (handlers) {
            const idx = handlers.indexOf(handler.bind(target));
            if (idx !== -1) {
                handlers.splice(idx, 1);
            }
        }
    }

    public static send(msgName: string, ...args: any[]) {
        const handlers = this._handlers.get(msgName);
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
    }
}

// 使用方式
// 注册消息
MessageCenter.register('playerDied', this.onPlayerDied, this);
// 发送消息
MessageCenter.send('playerDied', {score: 100});
```

## 7. 属性指示器

```js
// 创建装饰器
function watch(path: string) {
    return function(target: any, propertyKey: string) {
        let value = target[propertyKey];

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue) => {
                value = newValue;
                // 触发更新
                if (target.onPropertyChanged) {
                    target.onPropertyChanged(path, newValue);
                }
            }
        });
    }
}

// 使用装饰器
class MyComponent extends cc.Component {
    @watch('score')
    private _score: number = 0;

    onPropertyChanged(path: string, value: any) {
        console.log(`Property ${path} changed to ${value}`);
    }
}
```
