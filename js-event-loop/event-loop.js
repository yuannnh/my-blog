callback1 = () => console.log("我是 callback1");
callback2 = () => console.log("我是 callback2");

const func2 = () => {
  console.log("func2 开始");
  setTimeout(callback2, 1000);
  console.log("func2 结束");
};

const func1 = () => {
  console.log("func1 开始");
  setTimeout(callback1, 0);
  func2();
  console.log("func1 结束");
};

func1();

// 打印
// func1 开始
// func2 开始
// func2 结束
// func1 结束
// 我是 callback1
// 我是 callback2
