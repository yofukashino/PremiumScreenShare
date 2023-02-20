import { Injector, Logger, settings } from "replugged";
import { StreamStoreKeys, defaultParameters, defaultSettings } from "./lib/consts";
import * as Utils from "./lib/utils";
import "./style.css";
import { ApplicationStreamingOptionStore, TextTags, WebRTCUtils } from "./lib/requiredModules";
import { registerSettings } from "./Components/Settings";
import * as Types from "./types";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("PremiumScreenShare");
export const SettingValues = await settings.init("Tharki.PremiumScreenShare", defaultSettings);
const streamingConstants = (): Types.streamingConstants => ({
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

const patchQualityStore = (): void => {
  const maxResolution = Math.max(...streamingConstants().resolutionWithPresets);
  const maxFPS = Math.max(...streamingConstants().fpsWithPresets);
  const maxVideoQuality = Object.freeze({
    width: maxResolution * (16 / 9),
    height: maxResolution,
    framerate: maxFPS,
  });
  PluginInjector.before(WebRTCUtils.prototype, "updateVideoQuality", (_args: [], instance) => {
    const { videoQualityManager } = instance as unknown as Types.WebRTCUtils;
    videoQualityManager.options.videoBudget = maxVideoQuality;
    videoQualityManager.options.videoCapture = maxVideoQuality;
    for (const ladder in videoQualityManager.ladder.ladder) {
      videoQualityManager.ladder.ladder[ladder].framerate = maxVideoQuality.framerate;
      videoQualityManager.ladder.ladder[ladder].mutedFramerate = maxVideoQuality.framerate / 2;
    }
    for (const ladder of videoQualityManager.ladder.orderedLadder) {
      ladder.framerate = maxVideoQuality.framerate;
      ladder.mutedFramerate = maxVideoQuality.framerate / 2;
    }
  });
};
const fixBetterReadablityText = (): void => {
  PluginInjector.before(TextTags, "render", ([args]: Types.TextArgs) => {
    if (args?.title !== "Resolution" || !args?.children?.props?.children) return;
    const {
      children: { props },
    } = args;
    if (props?.children)
      props.children = props.children.replace(
        "(Source)",
        `(${
          SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution ==
          "0"
            ? "Source"
            : `${
                SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution
              }P`
        })`,
      );
  });
};
const applyInjections = (): void => {
  patchQualityStore();
  fixBetterReadablityText();
};
const setStreamParameters = (Parameters: Types.ApplicationStreamingOption): void => {
  for (const key in Parameters) {
    Object.defineProperty(ApplicationStreamingOptionStore, StreamStoreKeys[key], {
      value: Parameters[key],
      writable: true,
    });
  }
};
const setCustomParameters = (): void => {
  const customParameters = {
    ApplicationStreamFPS: Object.assign(
      {},
      ...streamingConstants().fps.map((res) => {
        const label = `FPS_${res}`;
        return { [res]: label, [label]: res };
      }),
    ),
    ApplicationStreamFPSButtons: streamingConstants().fps.map((fps) => ({
      value: fps,
      label: fps,
    })),
    ApplicationStreamFPSButtonsWithSuffixLabel: streamingConstants().fps.map((fps) => ({
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
    ApplicationStreamResolutionButtons: streamingConstants()
      .resolution.filter(
        (resolution) =>
          resolution !== Number(SettingValues.get("resolution", defaultSettings.resolution)[1]),
      )
      .map((resolution) => ({ value: resolution, label: resolution == 0 ? "Source" : resolution })),
    ApplicationStreamResolutionButtonsWithSuffixLabel: streamingConstants().resolution.map(
      (res) => ({
        value: res,
        label: res == 0 ? "Source" : `${res}p`,
      }),
    ),
    ApplicationStreamResolutions: Object.assign(
      {},
      ...streamingConstants().resolution.map((resolution) => {
        const label = `RESOLUTION_${resolution == 0 ? "SOURCE" : resolution}`;
        return { [resolution]: label, [label]: resolution };
      }),
    ),
    ApplicationStreamSettingRequirements: streamingConstants()
      .resolutionWithPresets.map((resolution) =>
        streamingConstants().fpsWithPresets.map((fps) => ({ resolution, fps })),
      )
      .flat(Infinity),
  };
  setStreamParameters(customParameters);
};
const addChangeListener = (): void => {
  PluginInjector.after(SettingValues, "set", () => {
    setCustomParameters();
  });
};
export const start = (): void => {
  registerSettings();
  applyInjections();
  setCustomParameters();
  addChangeListener();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  setStreamParameters(defaultParameters);
};
export { Settings } from "./Components/Settings";
