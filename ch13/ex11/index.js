export async function retryWithExponentialBackoff(func, maxRetry) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    function retryFunc() {
      func()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          if (retryCount < maxRetry) {
            retryCount++;
            setTimeout(retryFunc, Math.pow(2, retryCount) * 1000);
          } else {
            reject(error);
          }
        });
    }

    retryFunc();
  });
}
