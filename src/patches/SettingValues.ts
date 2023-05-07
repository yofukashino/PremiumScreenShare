import { PluginInjector, SettingValues } from "../index";
import { streamingConstants } from "../lib/consts";
import * as Utils from "../lib/utils";

export const patchSettingSetter = (): void => {
  PluginInjector.after(SettingValues, "set", () => {
    Utils.setCustomParameters(streamingConstants());
  });
};
