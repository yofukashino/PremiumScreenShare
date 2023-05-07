import { common } from "replugged";
import { SettingValues } from "../index";
import { StreamStoreKeys, defaultSettings } from "./consts";
import { ApplicationStreamingOptionStore } from "./requiredModules";
import * as Types from "../types";
const { React, lodash } = common;
export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) === pos;
};
export const ascending = (a: number, b: number): number => {
  return a - b;
};
export const findInTree = (
  tree: object,
  searchFilter: Types.DefaultTypes.AnyFunction | string,
  searchOptions?: { ignore?: string[]; walkable?: null | string[]; maxRecrusions?: number },
): unknown => {
  const { walkable = null, ignore = [], maxRecrusions = Infinity } = searchOptions ?? {};
  if (maxRecrusions == 0) return;
  if (typeof searchFilter === "string") {
    if (Object.hasOwnProperty.call(tree, searchFilter)) return tree[searchFilter];
  } else if (searchFilter(tree)) {
    return tree;
  }
  if (typeof tree !== "object" || tree == null) return;

  let tempReturn: unknown;
  if (Array.isArray(tree)) {
    for (const value of tree) {
      tempReturn = findInTree(value, searchFilter, {
        walkable,
        ignore,
        maxRecrusions: maxRecrusions - 1,
      });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  } else {
    const toWalk = walkable == null ? Object.keys(tree) : walkable;
    for (const key of toWalk) {
      if (!Object.hasOwnProperty.call(tree, key) || ignore.includes(key)) continue;
      tempReturn = findInTree(tree[key], searchFilter, {
        walkable,
        ignore,
        maxRecrusions: maxRecrusions - 1,
      });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  }
  return tempReturn;
};
export const isObject = (testMaterial: unknown): boolean =>
  typeof testMaterial === "object" &&
  !Array.isArray(testMaterial) &&
  testMaterial != null &&
  testMaterial !== DOMTokenList.prototype;
export const prototypeFilter = (
  ModuleExports: Types.DefaultTypes.ModuleExports,
  Protos: string[],
  returnFuntion?: boolean,
): boolean | Types.DefaultTypes.AnyFunction => {
  if (!isObject(ModuleExports)) return;
  return returnFuntion
    ? Object.values(ModuleExports).find((m: Types.DefaultTypes.AnyFunction) =>
        Protos.every((p: string) => m?.prototype?.[p]),
      )
    : Protos.every((p: string) =>
        Object.values(ModuleExports).some((m: Types.DefaultTypes.AnyFunction) => m?.prototype?.[p]),
      );
};
export const setStreamParameters = (Parameters: Types.ApplicationStreamingOption): void => {
  for (const key in Parameters) {
    Object.defineProperty(ApplicationStreamingOptionStore, StreamStoreKeys[key], {
      value: Parameters[key],
      writable: true,
    });
  }
};
export const setCustomParameters = (streamingConstants: Types.streamingConstants): void => {
  const customParameters = {
    ApplicationStreamFPS: Object.assign(
      {},
      ...streamingConstants.fps.map((res) => {
        const label = `FPS_${res}`;
        return { [res]: label, [label]: res };
      }),
    ),
    ApplicationStreamFPSButtons: streamingConstants.fps.map((fps) => ({
      value: fps,
      label: fps,
    })),
    ApplicationStreamFPSButtonsWithSuffixLabel: streamingConstants.fps.map((fps) => ({
      value: fps,
      label: `${fps} FPS`,
    })),
    ApplicationStreamPresetValues: {
      1: [
        {
          resolution: Number(
            SettingValues.get("smoothVideo", defaultSettings.smoothVideo).resolution,
          ),
          fps: Number(SettingValues.get("smoothVideo", defaultSettings.smoothVideo).fps),
        },
      ],
      2: [
        {
          resolution: Number(
            SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution,
          ),
          fps: Number(
            SettingValues.get("betterReadability", defaultSettings.betterReadability).fps,
          ),
        },
      ],
      3: [],
    },
    ApplicationStreamResolutionButtons: streamingConstants.resolution
      .filter(
        (resolution) =>
          resolution !== Number(SettingValues.get("resolution", defaultSettings.resolution)[1]),
      )
      .map((resolution) => ({ value: resolution, label: resolution == 0 ? "Source" : resolution })),
    ApplicationStreamResolutionButtonsWithSuffixLabel: streamingConstants.resolution.map((res) => ({
      value: res,
      label: res == 0 ? "Source" : `${res}p`,
    })),
    ApplicationStreamResolutions: Object.assign(
      {},
      ...streamingConstants.resolution.map((resolution) => {
        const label = `RESOLUTION_${resolution == 0 ? "SOURCE" : resolution}`;
        return { [resolution]: label, [label]: resolution };
      }),
    ),
    ApplicationStreamSettingRequirements: streamingConstants.resolutionWithPresets
      .map((resolution) => streamingConstants.fpsWithPresets.map((fps) => ({ resolution, fps })))
      .flat(Infinity),
  };
  setStreamParameters(customParameters);
};
export const useSetting = (
  settingsManager: typeof SettingValues,
  path: string,
  defaultValue?: string,
  options?: { clearable?: boolean },
): {
  value: string;
  onChange: (newValue: string) => void;
  onClear: () => void;
} => {
  const { clearable = false } = options ?? {};
  const [key, ...realPath] = path.split(".");
  const realPathJoined = realPath.join(".");
  const setting = settingsManager.get(key as keyof Types.Settings);
  const initial = realPath.length
    ? lodash.get(setting, realPathJoined, defaultValue)
    : (setting as unknown as string);
  const [value, setValue] = React.useState(initial);

  return {
    value,
    onClear: clearable
      ? () => {
          setValue("");
          const changed = realPath.length ? lodash.set(setting, realPathJoined, "") : ("" as never);
          settingsManager.set(key as keyof Types.Settings, changed);
        }
      : () => null,
    onChange: (newValue) => {
      setValue(newValue);
      const changed = realPath.length
        ? lodash.set(setting, realPathJoined, newValue)
        : (newValue as never);
      settingsManager.set(key as keyof Types.Settings, changed);
    },
  };
};
