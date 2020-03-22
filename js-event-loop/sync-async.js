const step1 = () => console.log(1);
const step3 = () => console.log(3);
const step4 = () => console.lo();

// 用 Promise 简单模拟一个执行时间为1秒，并在结束时候打印2的方程
const step2 = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 1000);
  });

// 异步机制执行 （JS引擎原生地支持 返回Promise的方法的异步执行，所以我们不需要做额外的包装，直接执行step2,它便是异步执行的）
const asyncExecute = () => {
  step1();
  step2();
  step3();
  step4();
};

// 同步机制执行（如果你不了解async、await不要紧，只要知道 await 后面的执行语句是同步阻塞的）
const syncExecute = async () => {
  step1();
  await step2();
  step3();
  step4();
};

asyncExecute(); // 打印 1 3 4 2
syncExecute(); // 打印 1 2 3 4
