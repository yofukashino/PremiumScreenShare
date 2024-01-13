import { webpack } from "replugged";
import Types from "../types";
export const ApplicationStreamingOptionStore =
  webpack.getByProps<Types.ApplicationStreamingOption>("ApplicationStreamFPS");
export const WebRTCUtils = webpack.getByProps<{
  default: Types.DefaultTypes.AnyFunction;
  BaseConnectionEvent: Record<string, string>;
}>("BaseConnectionEvent", "default");
export const { VideoQualityManager } = webpack.getByProps<{
  VideoQualityManager: Types.DefaultTypes.AnyFunction;
}>("VideoQualityManager");
export const StreamQualitySelectorPromise = webpack
  .waitForModule<Types.AverageDefaultModule>(
    webpack.filters.bySource("StreamSettings: user cannot be undefined"),
    {
      raw: true,
    },
  )
  .then((r) => r?.exports);
export const StreamSettingsPromise = webpack
  .waitForModule<Types.AverageDefaultModule>(
    webpack.filters.bySource("Messages.GO_LIVE_MODAL_APPLICATION_FORM_TITLE"),
    {
      raw: true,
    },
  )
  .then((r) => r?.exports);
export const StreamUpsellPromise = webpack
  .waitForModule<Types.AverageDefaultModule>(
    webpack.filters.bySource(".AnalyticsObjects.PREMIUM_UPSELL_BANNER"),
    {
      raw: true,
    },
  )
  .then((r) => r?.exports);
export const MediaEngineStore = webpack.getByStoreName<Types.MediaEngineStore>("MediaEngineStore");
export const VoiceConnection =
  webpack.getBySource<Types.DefaultTypes.AnyFunction>("getCodecCapabilities");

export const PartialProcessUtils =
  webpack.getByProps<Types.PartialProcessUtils>("getPidFromDesktopSource");

export const StreamRTCConnectionStore = webpack.getByStoreName<Types.StreamRTCConnectionStore>(
  "StreamRTCConnectionStore",
);
export const ApplicationStreamingSettingsStore =
  webpack.getByStoreName<Types.ApplicationStreamingSettingsStore>(
    "ApplicationStreamingSettingsStore",
  );
