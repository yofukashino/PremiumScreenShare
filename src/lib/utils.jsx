export const removeDuplicate = (item, pos, self) => {
  // eslint-disable-next-line eqeqeq
  return self.indexOf(item) == pos;
};
export const ascending = (a, b) => {
  return a - b;
};
export const filterOutObjectKey = (object, keys) =>
  Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
