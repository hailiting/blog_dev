function getSum() {
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
  return sum;
}
process.on("message", (data) => {
  console.info("子进程PID", process.pid);
  console.info("子进程接收到的信息：", data);
  const sum = getSum();
  // 发送信息到主进程
  process.send(sum);
});
