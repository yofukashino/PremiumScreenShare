import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { VoiceConnection, PartialProcessUtils } = Modules;
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
