import { PluginInjector } from "../index";

import { WebRTCUtils } from "../lib/requiredModules";

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
      instance: {
        isStreamContext?: boolean;
        qualityOverwrite: {
          capture: { framerate: number; height: number; width: number };
        };
      },
    ) => {
      if (!instance?.isStreamContext) {
        return res;
      }
      const {
        qualityOverwrite: { capture: ApplicationStreamingSettings },
      } = instance;
      const maxVideoQuality = {
        width: ApplicationStreamingSettings?.width,
        height: ApplicationStreamingSettings?.height,
        pixelCount: ApplicationStreamingSettings?.height * ApplicationStreamingSettings?.width,
        framerate: ApplicationStreamingSettings?.framerate,
      };
      if (ApplicationStreamingSettings?.height > 1080) {
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

export default (): void => {
  PluginInjector.before(
    WebRTCUtils.default.prototype,
    "initializeStreamParameters",
    (args, instance: Types.DefaultTypes.ObjectExports & Types.WebRTCUtils) => {
      if (instance?.videoQualityManager) patchQualityOptions(instance.videoQualityManager);
      return args;
    },
  );
};
