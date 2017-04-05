async function delay<TRes extends any>(
  fn: () => TRes | Promise<TRes>,
  delayMs: number
):Promise<TRes> {
  // Wait for delay
  await new Promise(resolve => setTimeout(resolve, delayMs));

  // Run function
  const res:TRes = await fn();

  return res;
}

export function delayCb<TRes extends any>(
  fn: () => TRes,
  delayMs: number,
  callback: (err?:Error, res?:any) => TRes
) {
  setTimeout(() => {
    var res;
    try {
      res = fn();
    }
    catch (err) {
      callback(err);
    }

    callback(null, res);
  }, delayMs)
}

export default delay;