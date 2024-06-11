import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.StreamQualitySelectorPromise = webpack
    .waitForModule<Types.GenericExport>(
      webpack.filters.bySource("StreamSettings: user cannot be undefined"),
      {
        raw: true,
      },
    )
    .then(({ exports }) => exports);
  Modules.StreamSettingsPromise = webpack
    .waitForModule<Types.GenericExport>(
      webpack.filters.bySource("Messages.GO_LIVE_MODAL_APPLICATION_FORM_TITLE"),
      {
        raw: true,
      },
    )
    .then(({ exports }) => exports);
  Modules.StreamUpsellPromise = webpack
    .waitForModule<Types.GenericExport>(
      webpack.filters.bySource(".AnalyticsObjects.PREMIUM_UPSELL_BANNER"),
      {
        raw: true,
      },
    )
    .then((r) => r?.exports);
  Modules.VoiceConnection ??= await webpack.waitForModule<Types.DefaultTypes.AnyFunction>(
    webpack.filters.bySource("getCodecCapabilities"),
  );
  Modules.PartialProcessUtils ??= await webpack.waitForProps<Types.PartialProcessUtils>(
    "getPidFromDesktopSource",
  );

  Modules.WebRTCConnection ??= await webpack.waitForProps<Types.WebRTCConnection>(
    "BaseConnectionEvent",
    "default",
  );
  Modules.VideoQualityManager ??= await webpack
    .waitForProps<{
      VideoQualityManager: Types.DefaultTypes.AnyFunction;
    }>("VideoQualityManager")
    .then(({ VideoQualityManager }) => VideoQualityManager);

  Modules.MediaEngineStore ??= webpack.getByStoreName<Types.MediaEngineStore>("MediaEngineStore");
  Modules.ApplicationStreamingOption ??=
    webpack.getByProps<Types.ApplicationStreamingOption>("ApplicationStreamFPS");

  Modules.StreamRTCConnectionStore ??= webpack.getByStoreName<Types.StreamRTCConnectionStore>(
    "StreamRTCConnectionStore",
  );
  Modules.ApplicationStreamingSettingsStore ??=
    webpack.getByStoreName<Types.ApplicationStreamingSettingsStore>(
      "ApplicationStreamingSettingsStore",
    );
};

export default Modules;
