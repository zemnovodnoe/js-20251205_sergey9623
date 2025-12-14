/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (typeof obj != 'object') {return undefined;}
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}

export function invertObj1(obj) {
  if (typeof obj != 'object') {return undefined;}
  let ret = {};
  Object.keys(obj).forEach(key => ret[obj[key]] = key);
  return ret;
}
