import * as Types from "../types";
export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) == pos;
};
export const ascending = (a: number, b: number): number => {
  return a - b;
};
export const filterOutObjectKey = (object: object, keys: Array<string | number | symbol>): object =>
  Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
export const findInTree = (
  tree: object,
  searchFilter: Types.DefaultTypes.AnyFunction,
  { walkable = null, ignore = [] } = {},
): unknown => {
  if (typeof searchFilter === "string") {
    if (Object.hasOwnProperty.call(tree, searchFilter)) return tree[searchFilter];
  } else if (searchFilter(tree)) {
    return tree;
  }
  if (typeof tree !== "object" || tree == null) return;

  let tempReturn;
  if (Array.isArray(tree)) {
    for (const value of tree) {
      tempReturn = findInTree(value, searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  } else {
    const toWalk = walkable == null ? Object.keys(tree) : walkable;
    for (const key of toWalk) {
      if (!Object.hasOwnProperty.call(tree, key) || ignore.includes(key)) continue;
      tempReturn = findInTree(tree[key], searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  }
  return tempReturn;
};

export const findInReactTree = (
  tree: Types.ReactElement,
  searchFilter: Types.DefaultTypes.AnyFunction,
): unknown | Types.ReactElement => {
  return findInTree(tree, searchFilter, { walkable: ["props", "children", "child", "sibling"] });
};
