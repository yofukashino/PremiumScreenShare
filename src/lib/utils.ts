import { settings, util, webpack } from "replugged";
import { React, i18n, lodash } from "replugged/common";
import { SettingValues } from "../index";
import {
  MappedApplicationStreamingOption,
  defaultParameters,
  defaultSettings,
  streamStoreKeys,
} from "./consts";
import Modules from "./requiredModules";
import Types from "../types";

export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) === pos;
};

export const ascending = (a: number, b: number): number => {
  return a - b;
};

export const saveModuleKeys = (): Promise<void> => {
  streamStoreKeys.ApplicationStreamFPS = Object.entries(Modules.ApplicationStreamingOption).find(
    ([_key, value]) => Object.hasOwnProperty.call(value, "FPS_5"),
  )[0];

  streamStoreKeys.ApplicationStreamFPSButtons = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) && value.some((button: Types.StreamButtons) => button.label == 15),
  )[0];

  streamStoreKeys.ApplicationStreamFPSButtonsWithSuffixLabel = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) &&
      value.some((button: Types.StreamButtons) => button.label != 15 && button.value == 15),
  )[0];

  streamStoreKeys.ApplicationStreamPresetValues = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value?.[2]) && value[2].some((preset: Types.StreamPresets) => preset.fps == 15),
  )[0];

  streamStoreKeys.ApplicationStreamResolutionButtons = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) && value.some((button: Types.StreamButtons) => button.label == 720),
  )[0];

  streamStoreKeys.ApplicationStreamResolutionButtonsWithSuffixLabel = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) &&
      value.some((button: Types.StreamButtons) => button.label != 720 && button.value == 720),
  )[0];

  streamStoreKeys.ApplicationStreamResolutions = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(([_key, value]) => Object.hasOwnProperty.call(value, "RESOLUTION_SOURCE"))[0];

  streamStoreKeys.ApplicationStreamSettingRequirements = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) &&
      value.some(
        (requirement: Types.ApplicationStreamingOption["ApplicationStreamSettingRequirements"]) =>
          Object.hasOwnProperty.call(requirement, "guildPremiumTier"),
      ),
  )[0];
  streamStoreKeys.GoLiveDeviceResolutionButtons = Object.entries(
    Modules.ApplicationStreamingOption,
  ).find(
    ([_key, value]) =>
      Array.isArray(value) && value.length === 3 && value.some((v) => v.label === 720),
  )[0];
  streamStoreKeys.getApplicationFramerate = webpack.getFunctionKeyBySource(
    Modules.ApplicationStreamingOption,
    "Unknown frame rate:",
  );
  streamStoreKeys.getApplicationResolution = webpack.getFunctionKeyBySource(
    Modules.ApplicationStreamingOption,
    "Unknown resolution:",
  );
  streamStoreKeys.makeResolutionLabel = webpack.getFunctionKeyBySource(
    Modules.ApplicationStreamingOption,
    ".formatToPlainString",
  );
  return Promise.resolve();
};

export const saveDefaultParameters = (): Promise<void> => {
  defaultParameters.ApplicationStreamFPS = Object.freeze(
    Object.assign({}, Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamFPS]),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPS"];
  defaultParameters.ApplicationStreamFPSButtons = Object.freeze(
    Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamFPSButtons]?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPSButtons"];
  defaultParameters.ApplicationStreamFPSButtonsWithSuffixLabel = Object.freeze(
    Modules.ApplicationStreamingOption[
      streamStoreKeys.ApplicationStreamFPSButtonsWithSuffixLabel
    ]?.map((n) => Object.freeze(n)),
  ) as Types.ApplicationStreamingOption["ApplicationStreamFPSButtonsWithSuffixLabel"];
  defaultParameters.ApplicationStreamPresetValues = Object.freeze(
    Object.assign(
      {},
      Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamPresetValues],
    ),
  );
  defaultParameters.ApplicationStreamResolutionButtons = Object.freeze(
    Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamResolutionButtons]?.map(
      (n) => Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutionButtons"];
  defaultParameters.ApplicationStreamResolutionButtonsWithSuffixLabel = Object.freeze(
    Modules.ApplicationStreamingOption[
      streamStoreKeys.ApplicationStreamResolutionButtonsWithSuffixLabel
    ]?.map((n) => Object.freeze(n)),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutionButtonsWithSuffixLabel"];
  defaultParameters.ApplicationStreamResolutions = Object.freeze(
    Object.assign(
      {},
      Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamResolutions],
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamResolutions"];
  defaultParameters.ApplicationStreamSettingRequirements = Object.freeze(
    Modules.ApplicationStreamingOption[streamStoreKeys.ApplicationStreamSettingRequirements]?.map(
      (n) => Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["ApplicationStreamSettingRequirements"];
  defaultParameters.GoLiveDeviceResolutionButtons = Object.freeze(
    Modules.ApplicationStreamingOption[streamStoreKeys.GoLiveDeviceResolutionButtons]?.map((n) =>
      Object.freeze(n),
    ),
  ) as Types.ApplicationStreamingOption["GoLiveDeviceResolutionButtons"];
  return Promise.resolve();
};

export const setStreamParameters = (Parameters: Types.PartialApplicationStreamingOption): void => {
  for (const key in Parameters) {
    Object.defineProperty(Modules.ApplicationStreamingOption, streamStoreKeys[key], {
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
      get label() {
        return i18n.intl.formatToPlainString(i18n.t.STREAM_FPS_OPTION, { value: fps });
      },
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
    ApplicationStreamResolutionButtons: streamingConstants.resolution.map((resolution) => ({
      value: resolution,
      get label() {
        return resolution == 0
          ? MappedApplicationStreamingOption.makeResolutionLabel(0)
          : resolution;
      },
    })),
    ApplicationStreamResolutionButtonsWithSuffixLabel: streamingConstants.resolution.map(
      (resolution) => ({
        value: resolution,
        get label() {
          return MappedApplicationStreamingOption.makeResolutionLabel(resolution);
        },
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

export const getPidFromSourceId = (id: string): number | void => {
  const DiscordUtils =
    DiscordNative.nativeModules.requireModule<Types.DiscordUtils>("discord_utils");
  if (!DiscordUtils.getPidFromWindowHandle || !id) return;
  const [type, handle] = id.split(":");

  if (type === "window") {
    const pid = DiscordUtils.getPidFromWindowHandle(handle);
    return !pid ? void 0 : pid;
  }

  if (type.startsWith("screen")) return 1;
  return null;
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
        const setting = lodash.set({ ...settings.all() }, key, finalValue)[rootKey as K];
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

const useClearableSettings = <
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
  onClear: () => void;
  value: V;
  onChange: (newValue: Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>) => void;
} => {
  const { value, onChange } = useSetting(settings, key, fallback);
  const onClear = (): void =>
    onChange("" as Types.ValType<Types.NestedType<T, P>> | Types.ValType<T[K]>);
  return { onChange, value: value as V, onClear };
};

export default {
  ...util,
  removeDuplicate,
  ascending,
  saveModuleKeys,
  saveDefaultParameters,
  setStreamParameters,
  setCustomParameters,
  getBitrate,
  getPidFromSourceId,
  useSetting,
  useSettingArray,
  useClearableSettings,
};
