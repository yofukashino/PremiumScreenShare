import { SettingValues } from "../index";

import { ApplicationStreamingOptionStore } from "./requiredModules";

import Utils from "../lib/utils";

import Types from "../types";

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
  audioSource: "none",
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

export const defaultParameters = Object.freeze({
  ApplicationStreamFPS: Object.freeze(
    Object.assign({}, ApplicationStreamingOptionStore.ApplicationStreamFPS),
  ),
  ApplicationStreamFPSButtons: Object.freeze(
    ApplicationStreamingOptionStore.ApplicationStreamFPSButtons?.map((n) => Object.freeze(n)),
  ),
  ApplicationStreamFPSButtonsWithSuffixLabel: Object.freeze(
    ApplicationStreamingOptionStore.ApplicationStreamFPSButtonsWithSuffixLabel?.map((n) =>
      Object.freeze(n),
    ),
  ),
  ApplicationStreamPresetValues: Object.freeze(
    Object.assign({}, ApplicationStreamingOptionStore.ApplicationStreamPresetValues),
  ),
  ApplicationStreamResolutionButtons: Object.freeze(
    ApplicationStreamingOptionStore.ApplicationStreamResolutionButtons?.map((n) =>
      Object.freeze(n),
    ),
  ),
  ApplicationStreamResolutionButtonsWithSuffixLabel: Object.freeze(
    ApplicationStreamingOptionStore.ApplicationStreamResolutionButtonsWithSuffixLabel?.map((n) =>
      Object.freeze(n),
    ),
  ),
  ApplicationStreamResolutions: Object.freeze(
    Object.assign({}, ApplicationStreamingOptionStore.ApplicationStreamResolutions),
  ),
  ApplicationStreamSettingRequirements: Object.freeze(
    ApplicationStreamingOptionStore.ApplicationStreamSettingRequirements?.map((n) =>
      Object.freeze(n),
    ),
  ),
}) as Types.ApplicationStreamingOption;

export const streamingConstants = (): Types.streamingConstants => ({
  get fps() {
    return Object.values(SettingValues.get("fps", defaultSettings.fps))
      .map((fps) => Number(fps))
      .sort(Utils.ascending)
      .filter(Utils.removeDuplicate);
  },
  get fpsWithPresets() {
    return [
      Number(SettingValues.get("betterReadability", defaultSettings.betterReadability).fps),
      Number(SettingValues.get("smoothVideo", defaultSettings.smoothVideo).fps),
      ...this.fps,
    ];
  },
  get resolution() {
    return [
      ...Object.values(SettingValues.get("resolution", defaultSettings.resolution))
        .map((resolution) => Number(resolution))
        .sort(Utils.ascending)
        .filter(Utils.removeDuplicate),
      0,
    ];
  },
  get resolutionWithPresets() {
    return [
      Number(SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution),
      Number(SettingValues.get("smoothVideo", defaultSettings.smoothVideo).resolution),
      ...this.resolution,
    ];
  },
});
