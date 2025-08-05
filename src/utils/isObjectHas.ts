export function isObjectHas(
  data: { [key: string]: string },
  required?: { [key: string]: boolean }
) {
  let res = true;
  Object.keys(data).forEach((key) => {
    if (!data[key] && (!required || required[key] === true))
      return (res = false);
  });
  return res;
}
