navigator.serviceWorker.register("sw.js");
navigator.serviceWorker.ready.then(function (registration) {
  return registration.pushManager.getSubscription().then(async function (subscription) {
    // 注册
    if (subscription) {
      return subscription;
    }
    // 如果没有，初始化一个新的subscripion对象
    const response = await fetch("./vapidPublicKey"); // 请求公钥
    const vapidPublicKey = await response.text(); // 响应转文本
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey); // 转化为 Uint8Array
    return registration.pushManager.subscribe({
      userVisibleOnly: true, // 发送给用户的通知都可见
      applicationServerKey: convertedVapidKey,
    })
  })
}).then(function (subscribe) {
  // 订阅
  fetch("./register", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      subscription: subscription
    })
  })

  document.getElementById("doIt").onclick = function () {
    const payload = document.getElementById("notification-payload").value;
    const delay = document.getElementById("notification-delay").value;
    const ttl = document.getElementById("notification-ttl").value;
    fetch("./sendNotification", {
      method: "post",
      headers: {
        "Content-Type": "Appliction/json"
      },
      body: JSON.stringify({
        subscription: subscription,
        payload: payload,
        delay: delay,
        ttl: ttl,
      }),
    })
  }
})