import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  const { VoiceConnection } = Modules;
  PluginInjector.before(
    VoiceConnection.prototype,
    "setGoLiveSource",
    (
      args: [
        Record<string, Record<string, unknown>> & {
          desktopDescription: { soundshareId: number; id?: string; hdrCaptureMode?: string };
        },
        string,
      ],
      instance: Types.DefaultTypes.ObjectExports & Types.VoiceEngine,
    ) => {
      if (args[0].desktopDescription)
        args[0].desktopDescription.hdrCaptureMode = SettingValues.get(
          "hdrCaptureMode",
          defaultSettings.hdrCaptureMode,
        )
          ? "always"
          : "never";
      if (
        args?.[0]?.desktopDescription?.id?.startsWith?.("screen") &&
        args?.[0]?.desktopDescription?.soundshareId
      ) {
        args[0].desktopDescription.soundshareId = instance.soundshareId as number;
      }
      return args;
    },
  );

  PluginInjector.after(
    VoiceConnection.prototype,
    "setGoLiveSource",
    (
      [{ desktopDescription }]: [
        Record<string, Record<string, unknown>> & {
          desktopDescription: { soundshareId: number; id?: string };
        },
        string,
      ],
      res,
      instance: Types.DefaultTypes.ObjectExports & Types.VoiceEngine,
    ) => {
      const windowId = SettingValues.get("audioSource", defaultSettings.audioSource);
      const pid = Utils.getPidFromSourceId(windowId);
      if (!desktopDescription?.id?.startsWith("screen") || desktopDescription.soundshareId == pid) {
        return res;
      }

      instance.setSoundshareSource(pid, true);
      instance.handleSoundshareFailed = () => {
        instance.setSoundshareSource(pid, true);
      };
      return res;
    },
  );
};
