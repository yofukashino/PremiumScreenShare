import { PluginInjector, SettingValues } from "../index";

import { defaultSettings } from "../lib/consts";

import { PartialProcessUtils, VoiceConnection } from "../lib/requiredModules";

import * as Types from "../types";

export const patchVoiceConnection = (): void => {
  PluginInjector.after(
    VoiceConnection.prototype,
    "setGoLiveSource",
    (_args, res, instance: Types.DefaultTypes.ObjectExports & Types.VoiceEngine) => {
      const windowId = SettingValues.get("audioSource", defaultSettings.audioSource);
      const pid = PartialProcessUtils.getPidFromDesktopSource(windowId);
      const connectionArray = Array.from(instance?.connections ?? []);
      const streamConnection = connectionArray?.find((c) => c?.goLiveSourceIdentifier);
      if (
        !pid ||
        !(streamConnection?.goLiveSourceIdentifier as string)?.includes("screen-handle:")
      ) {
        return res;
      }
      instance?.setSoundshareSource?.(pid, true);
      return res;
    },
  );
};
