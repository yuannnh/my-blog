// 这个函数会为你的 promiseFunction (一个返回promise的函数) 注入retry的机制。
// 比如 retryPromiseFunctionGenerator(myPromiseFunction, 4, 1000, true, 4000)
// 会返回一个函数，它的用法和功能与 myPromiseFunction 一样。但如果 Promise reject 了，
// 它就会进行retry, 最多retry 4 次，每次时间间隔指数增加，最初是1秒，随后2秒，4秒，由于
// 我们设定最大delay是4秒，那么之后就会持续delay4秒，直到达到最大retry次数 4 次。而如果
// enableExponentialBackoff 设为 false, delay就会是一个常量1秒。
const retryPromiseFunctionGenerator = (
  promiseFunction, // 需要被retry的function
  numRetries = defaultNumRetries, // 最多retry几次
  retryDelayMs = defaultRetryDelayMs, // 两次retry间的delay
  enableExponentialBackoff = false, // 是否启动指数增加delay
  maxRetryDelayMs // 最大delay时间
) => async (...args) => {
  for (
    let numRetriesLeft = numRetries;
    numRetriesLeft >= 0;
    numRetriesLeft -= 1
  ) {
    try {
      return await promiseFunction(...args);
    } catch (error) {
      if (numRetriesLeft === 0 || !isTransientFault(error)) {
        throw error;
      }

      const delay = enableExponentialBackoff
        ? Math.min(
            retryDelayMs * 2 ** (numRetries - numRetriesLeft),
            maxRetryDelayMs || Number.MAX_SAFE_INTEGER
          )
        : retryDelayMs;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
