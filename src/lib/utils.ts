import { settings, util } from "replugged";
import { React, lodash } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "./consts";
import { ApplicationStreamingOptionStore } from "./requiredModules";
import Types from "../types";
export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) === pos;
};
export const ascending = (a: number, b: number): number => {
  return a - b;
};
export const forceRerenderElement = async (selector: string): Promise<void> => {
  const element = await util.waitFor(selector);
  if (!element) return;
  const ownerInstance = util.getOwnerInstance(element);
  const unpatchRender = PluginInjector.instead(ownerInstance, "render", () => {
    unpatchRender();
    return null;
  });
  ownerInstance.forceUpdate(() => ownerInstance.forceUpdate(() => {}));
};

export const setStreamParameters = (Parameters: Types.ApplicationStreamingOption): void => {
  for (const key in Parameters) {
    Object.defineProperty(ApplicationStreamingOptionStore, key, {
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
export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | K,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: Types.NestedType<T, P> | F;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => void;
} => {
  const [initialKey, ...pathArray] = Object.keys(settings.all()).includes(key)
    ? ([key] as [K])
    : (key.split(".") as [K, ...string[]]);
  const path = pathArray.join(".");
  const initial = settings.get(initialKey, path.length ? ({} as T[K]) : (fallback as T[K]));
  const [value, setValue] = React.useState<Types.NestedType<T, P>>(
    path.length
      ? (lodash.get(initial, path, fallback) as Types.NestedType<T, P>)
      : (initial as Types.NestedType<T, P>),
  );

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P> | F>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = checked ?? targetChecked ?? targetValue ?? value ?? newValue;

      setValue(finalValue as Types.NestedType<T, P>);
      settings.set(
        initialKey,
        path.length ? (lodash.set(initial, path, finalValue) as T[K]) : (finalValue as T[K]),
      );
    },
  };
};

export default {
  ...util,
  removeDuplicate,
  ascending,
  forceRerenderElement,
  setStreamParameters,
  setCustomParameters,
  useSetting,
};
