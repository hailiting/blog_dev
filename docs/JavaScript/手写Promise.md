# 手写 Promise

```js
// const p1 = new Promise((resolve, reject) => {
//   resolve("成功"); // fulfilled
//   reject("失败");
// })
//   .then(
//     (res) => res + "======999",
//     (err) => console.log(err)
//   )
//   .then(
//     (res) => console.log(res),
//     (err) => console.log(err)
//   )
//   .then(
//     (res) => new Promise((resolve, reject) => resolve(3 * res)),
//     (error) => console.log(error)
//   );
// const p2 = new Promise((resolve, reject) => {
//   reject("失败"); // rejected
//   resolve("成功");
// });
// const p3 = new Promise((resolve, reject) => {
//   throw "报错"; // rejected
// });
class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  initValue() {
    this.PromiseResult = null;
    this.PromiseState = "pending";
    // 保存回调
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }
  reject(reason) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        // 宏任务（promise.then是微任务）
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x === thenPromise) {
              throw new Error("不能返回自身");
            }
            if (x instanceof MyPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (err) {
            reject(err);
            throw new Error(err);
          }
        });
      };
      if (this.PromiseState === "fulfilled") {
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === "rejected") {
        resolvePromise(onRejected);
      } else if (this.PromiseState === "pending") {
        this.onFulfilledCallbacks.push(onFulfilled.bind(this));
        this.onRejectedCallbacks.push(onRejected.bind(this));
      }
    });
    return thenPromise;
  }
  static all(promise) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value;
        count++;
        if (count === promise.length) resolve(result);
      };
      promise.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then((res) => {
            addData(index, res);
          });
        } else {
          addData(index, res);
        }
      });
    });
  }
  static race(promise) {
    return new MyPromise((resolve, reject) => {
      promise.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(index, res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resolve(index, res);
        }
      });
    });
  }
  static allSettled(promises) {
    const res = [];
    let count = 0;
    const addData = (status, value, i) => {
      res[i] = {
        status,
        value,
      };
      count++;
      if (count === promises.length) {
        resolve(res);
      }
    };
    promises.forEach((promise, i) => {
      if (promise instanceof MyPromise) {
        promise.then(
          (res) => {
            addData("fulfilled", res, i);
          },
          (err) => {
            addData("rejected", err, i);
          }
        );
      } else {
        addData("fulfilled", promise, i);
      }
    });
  }
  static any(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      promises.forEach((promise) => {
        promise.then(
          (val) => {
            resolve(val);
          },
          (err) => {
            count++;
            if (count === promises.length) {
              reject(new AggregateError("All promises were rejected"));
            }
          }
        );
      });
    });
  }
}
const test3 = new MyPromise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => new MyPromise((resolve, reject) => resolve(2 * res)),
    (err) => console.log("失败222", err)
  )
  .then(
    (res) => console.log("成功", res),
    (err) => console.log("失败", err)
  );
```
