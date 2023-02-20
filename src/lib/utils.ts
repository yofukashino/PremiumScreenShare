import { common } from "replugged";
import * as lodash from "lodash";
import * as Types from "../types";
import { SettingValues } from "../index";
const { React } = common;
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
export const useSetting = (
  settingsManager: typeof SettingValues,
  path: string,
  defaultValue?: string,
): {
  value: string;
  onChange: (newValue: string) => void;
} => {
  const [key, ...realPath] = path.split(".");
  const realPathJoined = realPath.join(".");
  const settingObject = settingsManager.get(key as keyof Types.Settings);
  const initial = lodash.get(settingObject, realPathJoined, defaultValue);
  const [value, setValue] = React.useState(initial);

  return {
    value,
    onChange: (newValue) => {
      setValue(newValue);
      lodash.set(settingObject, realPathJoined, newValue);
      settingsManager.set(key as keyof Types.Settings, settingObject);
    },
  };
};
