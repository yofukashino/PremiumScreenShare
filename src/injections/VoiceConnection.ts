import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { VoiceConnection } from "@lib/RequiredModules";
import Utils from "@Utils";

import type { MediaEngine } from "@lib/RequiredModules/MediaEngineStore";

PluginInjector.before(
  VoiceConnection.prototype,
  "setGoLiveSource",
  (args, instance: MediaEngine) => {
    const [source] = args;
    const hdrCaptureMode = SettingValues.get("hdrCaptureMode", DefaultSettings.hdrCaptureMode);

    if (source.desktopDescription)
      source.desktopDescription.hdrCaptureMode = hdrCaptureMode ? "always" : "never";
    if (
      source?.desktopDescription?.id?.startsWith?.("screen") &&
      source?.desktopDescription?.soundshareId
    ) {
      source.desktopDescription.soundshareId = instance.soundshareId;
    }
    return args;
  },
);

PluginInjector.after(
  VoiceConnection.prototype,
  "setGoLiveSource",
  ([{ desktopDescription }], res, instance: MediaEngine) => {
    const windowId = SettingValues.get("audioSource", DefaultSettings.audioSource);
    const pid = Utils.getPidFromSourceId(windowId);

    if (!desktopDescription?.id?.startsWith("screen") || desktopDescription.soundshareId === pid) {
      return res;
    }

    instance.setSoundshareSource(pid, true);
    instance.handleSoundshareFailed = () => {
      instance.setSoundshareSource(pid, true);
    };
    return res;
  },
);
