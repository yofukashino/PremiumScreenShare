import { Injector, Logger, settings } from "replugged";
import { defaultParameters, defaultSettings, streamingConstants } from "./lib/consts";
import Utils from "./lib/utils";
import { registerSettings } from "./Components/Settings";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("PremiumScreenShare");
export const SettingValues = await settings.init("dev.tharki.PremiumScreenShare", defaultSettings);
import applyInjections from "./patches/index";

export const start = (): void => {
  registerSettings();
  applyInjections();
  Utils.setCustomParameters(streamingConstants());
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Utils.setStreamParameters(defaultParameters);
};
export { Settings } from "./Components/Settings";
