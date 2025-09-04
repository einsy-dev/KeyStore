export async function delay(callback: () => any, time: number = 0) {
  return new Promise((res, rej) => {
    try {
      setTimeout(() => {
        res(callback());
      }, time);
    } catch (e) {
      rej(e);
    }
  });
}
