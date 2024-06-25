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
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".PREMIUM_UPSELL_BANNER,"), {
      raw: true,
    })
    .then((r) => r?.exports);

  Modules.VoiceConnection ??= await webpack
    .waitForModule<Types.DefaultTypes.AnyFunction>(
      webpack.filters.bySource("clearAllSpeaking(){}"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find VoiceConnection  Module");
    });

  Modules.PartialProcessUtils ??= await webpack
    .waitForProps<Types.PartialProcessUtils>(["getPidFromDesktopSource"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find PartialProcessUtils  Module");
    });

  Modules.WebRTCConnection ??= await webpack
    .waitForModule<Types.WebRTCConnection>(webpack.filters.bySource("updateVideoQuality: "), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find WebRTCConnection  Module");
    });

  Modules.VideoQualityManager ??= await webpack
    .waitForModule(webpack.filters.bySource("this.getQuality("), {
      timeout: 10000,
    })
    .then((mod) =>
      webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(mod, "this.getQuality("),
    )
    .catch(() => {
      throw new Error("Failed To Find VideoQualityManager  Module");
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
