export function isPlainObject(object: object) {
  if (typeof object !== "object" || object === null) return false;
  const proto = Object.getPrototypeOf(object);
  return proto === null || proto === Object.prototype;
}
