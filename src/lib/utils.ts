import { settings, util } from "replugged";
import { React, lodash } from "replugged/common";
import { SettingValues } from "../index";
import { defaultParameters, defaultSettings } from "./consts";
import Modules from "./requiredModules";
import Types from "../types";

export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) === pos;
};

export const ascending = (a: number, b: number): number => {
  return a - b;
};

export const saveDefaultParameters = (): Promise<void> => {
  defaultParameters.ApplicationStreamFPS = Object.freeze(
    Object.assign({}, Modules.ApplicationStreamingOptionStore.ApplicationStreamFPS),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPS"];
  defaultParameters.ApplicationStreamFPSButtons = Object.freeze(
    Modules.ApplicationStreamingOptionStore.ApplicationStreamFPSButtons?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPSButtons"];
  defaultParameters.ApplicationStreamFPSButtonsWithSuffixLabel = Object.freeze(
    Modules.ApplicationStreamingOptionStore.ApplicationStreamFPSButtonsWithSuffixLabel?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPSButtonsWithSuffixLabel"];
  defaultParameters.ApplicationStreamPresetValues = Object.freeze(
    Object.assign({}, Modules.ApplicationStreamingOptionStore.ApplicationStreamPresetValues),
  );
  defaultParameters.ApplicationStreamResolutionButtons = Object.freeze(
    Modules.ApplicationStreamingOptionStore.ApplicationStreamResolutionButtons?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutionButtons"];
  defaultParameters.ApplicationStreamResolutionButtonsWithSuffixLabel = Object.freeze(
    Modules.ApplicationStreamingOptionStore.ApplicationStreamResolutionButtonsWithSuffixLabel?.map(
      (n) => Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutionButtonsWithSuffixLabel"];
  defaultParameters.ApplicationStreamResolutions = Object.freeze(
    Object.assign({}, Modules.ApplicationStreamingOptionStore.ApplicationStreamResolutions),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutions"];
  defaultParameters.ApplicationStreamSettingRequirements = Object.freeze(
    Modules.ApplicationStreamingOptionStore.ApplicationStreamSettingRequirements?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamSettingRequirements"];
  defaultParameters.GoLiveDeviceResolutionButtons = Object.freeze(
    Modules.ApplicationStreamingOptionStore.GoLiveDeviceResolutionButtons?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["GoLiveDeviceResolutionButtons"];
  return Promise.resolve();
};

export const setStreamParameters = (Parameters: Types.ApplicationStreamingOption): void => {
  for (const key in Parameters) {
    Object.defineProperty(Modules.ApplicationStreamingOptionStore, key, {
      value: Parameters[key],
      writable: true,
    });
  }
};
export const setCustomParameters = (streamingConstants: Types.StreamingConstants): void => {
  const customParameters = {
    ApplicationStreamFPS: Object.assign(
      {},
      ...streamingConstants.fps.map((fps) => {
        const label = `FPS_${fps}`;
        return { [fps]: label, [label]: fps };
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
    ApplicationStreamResolutionButtonsWithSuffixLabel: streamingConstants.resolution.map(
      (resolution) => ({
        value: resolution,
        label: resolution == 0 ? "Source" : `${resolution}p`,
      }),
    ),
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
    GoLiveDeviceResolutionButtons: streamingConstants.resolution
      .filter(
        (resolution) =>
          !(
            resolution == Number(SettingValues.get("resolution", defaultSettings.resolution)[1]) ||
            resolution == 0
          ),
      )
      .map((resolution) => ({ value: resolution, label: resolution })),
  };
  setStreamParameters(customParameters);
};

export const getBitrate = (
  resolution: number,
): { bitrateMax: number; bitrateMin: number; bitrateTarget: number } => {
  switch (resolution) {
    case 2160: {
      return {
        bitrateMax: 1280000000,
        bitrateMin: 80000000,
        bitrateTarget: 96000000,
      };
    }
    case 1440: {
      return {
        bitrateMax: 320000000,
        bitrateMin: 10000000,
        bitrateTarget: 24000000,
      };
    }
    case 1080: {
      return {
        bitrateMax: 213333333,
        bitrateMin: 6666666,
        bitrateTarget: 16000000,
      };
    }
    case 720: {
      return {
        bitrateMax: 94814814,
        bitrateMin: 2962962,
        bitrateTarget: 320000,
      };
    }
    case 480: {
      return {
        bitrateMax: 43097642,
        bitrateMin: 1346800,
        bitrateTarget: 145454,
      };
    }
    case 360: {
      return {
        bitrateMax: 24348950,
        bitrateMin: 760903,
        bitrateTarget: 82177,
      };
    }
    case 240: {
      return {
        bitrateMax: 10821755,
        bitrateMin: 338179,
        bitrateTarget: 36523,
      };
    }
    case 144: {
      return {
        bitrateMax: 10821755,
        bitrateMin: 125251,
        bitrateTarget: 13527,
      };
    }
    default: {
      return {
        bitrateMax: 4008057,
        bitrateMin: 6666666,
        bitrateTarget: 16000000,
      };
    }
  }
};

export const useSetting = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): {
  value: V;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void;
} => {
  const initial = settings.get(key as K) ?? lodash.get(settings.all(), key) ?? fallback;
  const [value, setValue] = React.useState(initial as V);

  return {
    value,
    onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => {
      const isObj = newValue && typeof newValue === "object";
      const value = isObj && "value" in newValue ? newValue.value : newValue;
      const checked = isObj && "checked" in newValue ? newValue.checked : void 0;
      const target =
        isObj && "target" in newValue && newValue.target && typeof newValue.target === "object"
          ? newValue.target
          : void 0;
      const targetValue = target && "value" in target ? target.value : void 0;
      const targetChecked = target && "checked" in target ? target.checked : void 0;
      const finalValue = (checked ?? targetChecked ?? targetValue ?? value ?? newValue) as T[K];

      setValue(finalValue as V);

      if (settings.get(key as K)) {
        settings.set(key as K, finalValue);
      } else {
        const [rootKey] = key.split(/[-/.]/);
        const setting = lodash.set(settings.all(), key, finalValue)[rootKey as K];
        settings.set(rootKey as K, setting);
      }
    },
  };
};

export const useSettingArray = <
  T extends Record<string, Types.Jsonifiable>,
  D extends keyof T,
  K extends Extract<keyof T, string>,
  F extends Types.NestedType<T, P> | T[K] | undefined,
  P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}` | K,
  V extends P extends `${K}.${string}` | `${K}/${string}` | `${K}-${string}`
    ? NonNullable<Types.NestedType<T, P>>
    : P extends D
    ? NonNullable<T[P]>
    : F extends null | undefined
    ? T[P] | undefined
    : NonNullable<T[P]> | F,
>(
  settings: settings.SettingsManager<T, D>,
  key: P,
  fallback?: F,
): [V, (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void] => {
  const { value, onChange } = useSetting(settings, key, fallback);

  return [value as V, onChange];
};

export default {
  ...util,
  removeDuplicate,
  ascending,
  saveDefaultParameters,
  setStreamParameters,
  setCustomParameters,
  getBitrate,
  useSetting,
  useSettingArray,
};
