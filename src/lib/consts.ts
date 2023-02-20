import * as Types from "../types";

import { ApplicationStreamingOptionStore } from "./requiredModules";

export const defaultSettings = {
  fps: {
    1: "15",
    2: "30",
    3: "60",
  },
  resolution: {
    1: "480",
    2: "720",
    3: "1080",
    4: "1440",
  },
  smoothVideo: {
    resolution: "720",
    fps: "60",
  },
  betterReadability: {
    resolution: "0",
    fps: "60",
  },
};

export const fpsOptions = [
  {
    label: "5 FPS",
    value: "5",
  },
  {
    label: "10 FPS",
    value: "10",
  },
  {
    label: "15 FPS",
    value: "15",
  },
  {
    label: "30 FPS",
    value: "30",
  },
  {
    label: "45 FPS",
    value: "45",
  },
  {
    label: "60 FPS",
    value: "60",
  },
  {
    label: "120 FPS",
    value: "120",
  },
  {
    label: "144 FPS",
    value: "144",
  },
  {
    label: "240 FPS",
    value: "240",
  },
  {
    label: "360 FPS",
    value: "360",
  },
];

export const resoOptions = [
  {
    label: "144p",
    value: "144",
  },
  {
    label: "240p",
    value: "240",
  },
  {
    label: "360p",
    value: "360",
  },
  {
    label: "480p",
    value: "480",
  },
  {
    label: "720p",
    value: "720",
  },
  {
    label: "1080p",
    value: "1080",
  },
  {
    label: "1440p",
    value: "1440",
  },
  {
    label: "2160p",
    value: "2160",
  },
];

export const resoWithSource = [
  {
    label: "Source",
    value: "0",
  },
  ...resoOptions,
];

const StreamStoreKeysArray = Object.keys(ApplicationStreamingOptionStore);

export const StreamStoreKeys = {
  ApplicationStreamFPS: StreamStoreKeysArray.find((m) =>
    Object.hasOwnProperty.call(ApplicationStreamingOptionStore[m], "FPS_5"),
  ),
  ApplicationStreamFPSButtons: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]) &&
      ApplicationStreamingOptionStore[m].some((button: Types.StreamButtons) => button.label == 15),
  ),
  ApplicationStreamFPSButtonsWithSuffixLabel: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]) &&
      ApplicationStreamingOptionStore[m].some(
        (button: Types.StreamButtons) => button.label == "15 FPS",
      ),
  ),
  ApplicationStreamPresetValues: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]?.[2]) &&
      ApplicationStreamingOptionStore[m][2].some((preset: Types.StreamPresets) => preset.fps == 15),
  ),
  ApplicationStreamResolutionButtons: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]) &&
      ApplicationStreamingOptionStore[m].some((button: Types.StreamButtons) => button.label == 720),
  ),
  ApplicationStreamResolutionButtonsWithSuffixLabel: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]) &&
      ApplicationStreamingOptionStore[m].some(
        (button: Types.StreamButtons) => button.label == "480p",
      ),
  ),
  ApplicationStreamResolutions: StreamStoreKeysArray.find((m) =>
    Object.hasOwnProperty.call(ApplicationStreamingOptionStore[m], "RESOLUTION_SOURCE"),
  ),
  ApplicationStreamSettingRequirements: StreamStoreKeysArray.find(
    (m) =>
      Array.isArray(ApplicationStreamingOptionStore[m]) &&
      ApplicationStreamingOptionStore[m].some(
        (requirement: Types.ApplicationStreamSettingRequirements) =>
          Object.hasOwnProperty.call(requirement, "guildPremiumTier"),
      ),
  ),
};

export const defaultParameters = Object.freeze({
  ApplicationStreamFPS: Object.freeze(
    Object.assign({}, ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamFPS]),
  ),
  ApplicationStreamFPSButtons: Object.freeze(
    ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamFPSButtons]?.map((n) =>
      Object.freeze(n),
    ),
  ),
  ApplicationStreamFPSButtonsWithSuffixLabel: Object.freeze(
    ApplicationStreamingOptionStore[
      StreamStoreKeys.ApplicationStreamFPSButtonsWithSuffixLabel
    ]?.map((n) => Object.freeze(n)),
  ),
  ApplicationStreamPresetValues: Object.freeze(
    Object.assign(
      {},
      ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamPresetValues],
    ),
  ),
  ApplicationStreamResolutionButtons: Object.freeze(
    ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamResolutionButtons]?.map((n) =>
      Object.freeze(n),
    ),
  ),
  ApplicationStreamResolutionButtonsWithSuffixLabel: Object.freeze(
    ApplicationStreamingOptionStore[
      StreamStoreKeys.ApplicationStreamResolutionButtonsWithSuffixLabel
    ]?.map((n) => Object.freeze(n)),
  ),
  ApplicationStreamResolutions: Object.freeze(
    Object.assign(
      {},
      ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamResolutions],
    ),
  ),
  ApplicationStreamSettingRequirements: Object.freeze(
    ApplicationStreamingOptionStore[StreamStoreKeys.ApplicationStreamSettingRequirements]?.map(
      (n) => Object.freeze(n),
    ),
  ),
});
