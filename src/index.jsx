/* eslint-disable eqeqeq */
import { Injector, Logger, settings } from "replugged";
import { defaultParameters, defaultSettings } from "./lib/consts.jsx";
import * as Utils from "./lib/utils.jsx";
import "./style.css";
import { ApplicationStreamingOptionStore, TextTags, WebRTCUtils } from "./lib/requiredModules.jsx";
import { registerSettings } from "./Components/Settings.jsx";
const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("PremiumScreenShare");
export const pss = await settings.init("Tharki.PremiumScreenShare", defaultSettings);
const streamingConstants = () => ({
  get fps() {
    return Object.values(pss.get("fps", defaultSettings.fps))
      .sort(Utils.ascending)
      .filter((item, pos, self) => Utils.removeDuplicate(item, pos, self));
  },
  get fpsWithPresets() {
    return [
      pss.get("betterReadability", defaultSettings.betterReadability).fps,
      pss.get("smoothVideo", defaultSettings.smoothVideo).fps,
      ...this.fps,
    ];
  },
  get resolution() {
    return [
      ...Object.values(pss.get("resolution", defaultSettings.resolution))
        .sort(Utils.ascending)
        .filter((item, pos, self) => Utils.removeDuplicate(item, pos, self)),
      0,
    ];
  },
  get resolutionWithPresets() {
    return [
      pss.get("betterReadability", defaultSettings.betterReadability).resolution,
      pss.get("smoothVideo", defaultSettings.smoothVideo).resolution,
      ...this.resolution,
    ];
  },
});

const patchQualityStore = () => {
  const maxResolution = Math.max(...streamingConstants().resolutionWithPresets);
  const maxFPS = Math.max(...streamingConstants().fpsWithPresets);
  const maxVideoQuality = Object.freeze({
    width: maxResolution * (16 / 9),
    height: maxResolution,
    framerate: maxFPS,
  });
  PluginInjector.before(WebRTCUtils.prototype, "updateVideoQuality", (args, instance) => {
    instance.videoQualityManager.options.videoBudget = maxVideoQuality;
    instance.videoQualityManager.options.videoCapture = maxVideoQuality;
    for (const ladder in instance.videoQualityManager.ladder.ladder) {
      instance.videoQualityManager.ladder.ladder[ladder].framerate = maxVideoQuality.framerate;
      instance.videoQualityManager.ladder.ladder[ladder].mutedFramerate =
        maxVideoQuality.framerate / 2;
    }
    for (const ladder of instance.videoQualityManager.ladder.orderedLadder) {
      ladder.framerate = maxVideoQuality.framerate;
      ladder.mutedFramerate = maxVideoQuality.framerate / 2;
    }
  });
};
const fixBetterReadablityText = () => {
  PluginInjector.before(TextTags, "render", ([args]) => {
    if (args?.title !== "Resolution" || !args?.children?.props?.children) return;
    const {
      children: { props },
    } = args;
    if (props?.children)
      props.children = props.children.replace(
        "(Source)",
        `(${
          pss.get("betterReadability", defaultSettings.betterReadability).resolution == 0
            ? "Source"
            : `${pss.get("betterReadability", defaultSettings.betterReadability).resolution}P`
        })`,
      );
  });
};
const applyInjections = () => {
  patchQualityStore();
  fixBetterReadablityText();
};
const setStreamParameters = (Parameters) => {
  for (const key in Parameters) {
    Object.defineProperty(ApplicationStreamingOptionStore, key, {
      value: Parameters[key],
      writable: true,
    });
  }
};
const setCustomParameters = () => {
  const customParameters = {
    LY: Object.assign(
      {},
      ...streamingConstants().resolution.map((resolution) => {
        const label = `RESOLUTION_${resolution == 0 ? "SOURCE" : resolution}`;
        return { [resolution]: label, [label]: resolution };
      }),
    ),
    ND: streamingConstants()
      .resolutionWithPresets.map((resolution) =>
        streamingConstants().fpsWithPresets.map((fps) => ({ resolution, fps })),
      )
      .flat(Infinity),
    WC: streamingConstants()
      .resolution.filter(
        (resolution) => resolution !== pss.get("resolution", defaultSettings.resolution)[1],
      )
      .map((resolution) => ({ value: resolution, label: resolution == 0 ? "Source" : resolution })),
    af: streamingConstants().fps.map((fps) => ({ value: fps, label: `${fps} FPS` })),
    k0: streamingConstants().fps.map((fps) => ({ value: fps, label: fps })),
    km: streamingConstants().resolution.map((res) => ({
      value: res,
      label: res == 0 ? "Source" : `${res}p`,
    })),
    no: {
      1: [pss.get("smoothVideo", defaultSettings.smoothVideo)],
      2: [pss.get("betterReadability", defaultSettings.betterReadability)],
      3: [],
    },
    ws: Object.assign(
      {},
      ...streamingConstants().fps.map((res) => {
        const label = `FPS_${res}`;
        return { [res]: label, [label]: res };
      }),
    ),
  };
  setStreamParameters(customParameters);
};
const addChangeListener = () => {
  PluginInjector.after(pss, "set", () => {
    setCustomParameters();
  });
};
export const start = () => {
  registerSettings();
  applyInjections();
  setCustomParameters();
  addChangeListener();
};

export const stop = () => {
  PluginInjector.uninjectAll();
  setStreamParameters(defaultParameters);
};
export { Settings } from "./Components/Settings.jsx";
