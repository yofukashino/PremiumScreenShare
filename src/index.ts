import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./styles.css";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("PremiumScreenShare", "#b380ff");
export const SettingValues = await settings.init("dev.tharki.PremiumScreenShare", defaultSettings);
import Settings from "./Components/Settings";
import Injections from "./injections/index";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
  Injections.removeInjections();
};

export { Settings } from "./Components/Settings";
