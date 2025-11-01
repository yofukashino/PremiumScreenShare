import { Injector, Logger, settings } from "replugged";
import { DefaultSettings } from "@consts";
import Settings from "@components/Settings";
import Injections from "@Injections";

import "./styles.css";

export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("PremiumScreenShare", "#ffffff80");
export const SettingValues = settings.init("dev.tharki.PremiumScreenShare", DefaultSettings);

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjections();
};

export { Settings } from "@components/Settings";

export { _getFPS, _getResolution, _getBirtate } from "./plaintextFunctions";
