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
      webpack.filters.bySource(".NOTIFY_STREAM_SETTING_UPDATE,"),
      {
        raw: true,
      },
    )
    .then(({ exports }) => exports);
  Modules.StreamUpsellPromise = webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".PREMIUM_UPSELL_BANNER,"), {
      raw: true,
    })
    .then((r) => r.exports);

  Modules.getStreamSettingContextPromise ??= webpack
    .waitForModule(webpack.filters.bySource("Using uninitialized GoLiveModalContextDispatch"))
    .then((c) => webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(c, "return["));

  Modules.StreamRefreshModalPromise = webpack.waitForModule<Types.DefaultTypes.ModuleExports>(
    webpack.filters.bySource("stream-options"),
  );

  Modules.PremiumQualityChecker ??= await webpack
    .waitForModule<Types.DefaultTypes.RawModule>(
      webpack.filters.bySource(/\w+===\w+\.resolution&&\w+===\w+\.fps/),
      {
        timeout: 10000,
        raw: true,
      },
    )
    .then((r) => r.exports as Types.DefaultTypes.ModuleExports)
    .catch(() => {
      throw new Error("Failed To Find PremiumQualityChecker  Module");
    });

  Modules.VoiceConnection ??= await webpack
    .waitForPrototype<Types.DefaultTypes.AnyFunction & { clearAllSpeaking }>(["clearAllSpeaking"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find VoiceConnection  Module");
    });

  Modules.WebRTCConnection ??= await webpack
    .waitForModule<Types.WebRTCConnection>(webpack.filters.bySource("updateVideoQuality: "), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find WebRTCConnection  Module");
    });

  Modules.getNativeSources ??= await webpack
    .waitForModule<Types.DefaultTypes.AnyFunction>(
      webpack.filters.bySource("Can't get desktop sources outside of native app"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find getNativeScreens Module");
    });

  Modules.ApplicationStreamingOption ??= await webpack
    .waitForModule<Types.ApplicationStreamingOption>(
      webpack.filters.bySource("Unknown resolution: "),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find ApplicationStreamingOption  Module");
    });
  Modules.RTCConnectionSocket ??= await webpack
    .waitForModule<Types.DefaultTypes.AnyFunction>(
      webpack.filters.bySource("_handleVoiceQualityPeriodicsStats"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find RTCConnectionSocket  Module");
    });

  Modules.MediaEngineStore ??= webpack.getByStoreName<Types.MediaEngineStore>("MediaEngineStore");
  Modules.StreamRTCConnectionStore ??= webpack.getByStoreName<Types.StreamRTCConnectionStore>(
    "StreamRTCConnectionStore",
  );
  Modules.ApplicationStreamingSettingsStore ??=
    webpack.getByStoreName<Types.ApplicationStreamingSettingsStore>(
      "ApplicationStreamingSettingsStore",
    );
};

export default Modules;
