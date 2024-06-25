import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { VoiceConnection, PartialProcessUtils } = Modules;
  PluginInjector.before(
    VoiceConnection.prototype,
    "setGoLiveSource",
    (args: [Record<string, Record<string, unknown>>, string]) => {
      if (args[0]?.desktopDescription)
        args[0].desktopDescription.hdrCaptureMode = SettingValues.get(
          "hdrCaptureMode",
          defaultSettings.hdrCaptureMode,
        )
          ? "always"
          : "never";
      return args;
    },
  );
  PluginInjector.after(
    VoiceConnection.prototype,
    "setGoLiveSource",
    (_args, res, instance: Types.DefaultTypes.ObjectExports & Types.VoiceEngine) => {
      const windowId = SettingValues.get("audioSource", defaultSettings.audioSource);
      const pid = PartialProcessUtils.getPidFromDesktopSource(windowId);
      const connectionArray = Array.from(instance?.connections ?? []);
      const streamConnection = connectionArray?.find((c) => c?.goLiveSourceIdentifier);
      if (
        !streamConnection?.goLiveSourceIdentifier?.includes("screen-handle:") ||
        streamConnection?.soundshareId == pid
      ) {
        return res;
      }
      instance?.setSoundshareSource?.(pid, true);
      return res;
    },
  );
};
