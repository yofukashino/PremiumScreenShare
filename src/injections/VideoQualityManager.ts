import { users as UltimateUserStore } from "replugged/common";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  PluginInjector.after(
    Modules.VideoQualityManager.prototype,
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
        connection: Types.WebRTCConnection;
        goliveMaxQuality: {
          capture: { framerate: number; height: number; width: number };
        };
        isEdited?: boolean;
      },
    ) => {
      if (
        !instance.isStreamContext ||
        (instance.connection.streamUserId &&
          instance.connection.streamUserId !== UltimateUserStore.getCurrentUser().id)
      ) {
        return res;
      }

      const {
        goliveMaxQuality: { capture: ApplicationStreamingSettings },
      } = instance;

      const maxVideoQuality = {
        width: ApplicationStreamingSettings.width,
        height: ApplicationStreamingSettings.height,
        pixelCount:
          (ApplicationStreamingSettings.width || screen.width) *
          (ApplicationStreamingSettings.height || screen.height),
        framerate: ApplicationStreamingSettings.framerate,
      };

      Object.assign(res, Utils.getBitrate(ApplicationStreamingSettings.height || screen.height));

      if (!res.capture) {
        return res;
      }
      Object.assign(res.capture, maxVideoQuality);

      if (!res.encode) {
        return res;
      }
      Object.assign(res.encode, maxVideoQuality);

      return res;
    },
  );
};
