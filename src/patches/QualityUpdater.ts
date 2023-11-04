import { PluginInjector } from "../index";

import { ApplicationStreamingSettingsStore, WebRTCUtils } from "../lib/requiredModules";

import * as Types from "../types";

export const patchQualityOptions = (
  VideoQualityManager: Types.videoQualityManagerOrSinkWants,
): void => {
  PluginInjector.after(
    VideoQualityManager,
    "getQuality",
    (
      _args: [],
      res: {
        bitrateMax: number;
        bitrateMin: number;
        bitrateTarget: number;
        capture: { framerate: number; height: number; width: number };
        encode?: { framerate: number; height: number; width: number };
      },
      instance: { isStreamContext?: boolean },
    ) => {
      if (!instance?.isStreamContext) {
        return res;
      }
      const ApplicationStreamingSettings = ApplicationStreamingSettingsStore.getState();
      const maxResolution = ApplicationStreamingSettings?.resolution;
      const maxFPS = ApplicationStreamingSettings?.fps;
      const maxVideoQuality = {
        width: maxResolution * (16 / 9),
        height: maxResolution,
        pixelCount: maxResolution * (maxResolution * (16 / 9)),
        framerate: maxFPS,
      };
      if (ApplicationStreamingSettings?.resolution > 1080) {
        res.bitrateMax = 10000000;
        res.bitrateMin = 500000;
        res.bitrateTarget = 900000;
      }
      if (!res?.capture) {
        return res;
      }
      Object.assign(res.capture, maxVideoQuality);
      if (!res?.encode) {
        return res;
      }
      Object.assign(res.encode, maxVideoQuality);
      return res;
    },
  );
};

export const patchQualityUpdater = (): void => {
  PluginInjector.before(
    WebRTCUtils.default.prototype,
    "initializeStreamParameters",
    (args, instance: Types.DefaultTypes.ObjectExports & Types.WebRTCUtils) => {
      if (instance?.videoQualityManager) patchQualityOptions(instance.videoQualityManager);
      return args;
    },
  );
};
