import { components } from "replugged";
import { PluginLogger, SettingValues } from "../index";
const { SelectItem, ButtonItem, Category } = components;
import { defaultSettings, fpsOptions, resoOptions } from "../lib/consts";
import * as Types from "../types";
import * as Utils from "../lib/utils";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const resetSettings = (): void => {
  PluginLogger.log("Resetting PremiumScreenShare's Settings.");
  for (const key of Object.keys(SettingValues.all()))
    SettingValues.delete(key as keyof Types.Settings);
  registerSettings();
};
export const Settings = () => {
  return (
    <div>
      <Category {...{ title: "FPS", note: "Depends on your screen FPS", open: false }}>
        <SelectItem
          {...{
            note: "Replace 15 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            ...Utils.useSetting(SettingValues, "fps.1", defaultSettings.fps[1], {
              clearable: true,
            }),
          }}>
          FPS 15
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 30 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            ...Utils.useSetting(SettingValues, "fps.2", defaultSettings.fps[2], {
              clearable: true,
            }),
          }}>
          FPS 30
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 60 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            ...Utils.useSetting(SettingValues, "fps.3", defaultSettings.fps[3], {
              clearable: true,
            }),
          }}>
          FPS 60
        </SelectItem>
      </Category>
      <Category
        {...{ title: "Resolution", note: "Depends on your screen resolution", open: false }}>
        <SelectItem
          {...{
            note: "Replace 480p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(SettingValues, "resolution.1", defaultSettings.resolution[1], {
              clearable: true,
            }),
          }}>
          480p
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 720p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(SettingValues, "resolution.2", defaultSettings.resolution[2], {
              clearable: true,
            }),
          }}>
          720p
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 1080p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(SettingValues, "resolution.3", defaultSettings.resolution[3], {
              clearable: true,
            }),
          }}>
          1080p
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 1440p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(SettingValues, "resolution.4", defaultSettings.resolution[4], {
              clearable: true,
            }),
          }}>
          1440p
        </SelectItem>
      </Category>
      <Category {...{ title: "Preset Smoother Video", shown: false }}>
        <SelectItem
          {...{
            note: "Change Smoother Video preset resolution",
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(
              SettingValues,
              "smoothVideo.resolution",
              defaultSettings.smoothVideo.resolution,
            ),
          }}>
          Resolution
        </SelectItem>
        <SelectItem
          {...{
            note: "Change smoother video preset FPS",
            disabled: false,
            options: fpsOptions,
            ...Utils.useSetting(SettingValues, "smoothVideo.fps", defaultSettings.smoothVideo.fps),
          }}>
          FPS
        </SelectItem>
      </Category>
      <Category {...{ title: "Preset Better Readability", shown: false }}>
        <SelectItem
          {...{
            note: "Change Better Readability preset resolution",
            disabled: false,
            options: resoOptions,
            ...Utils.useSetting(
              SettingValues,
              "betterReadability.resolution",
              defaultSettings.betterReadability.resolution,
              { clearable: true },
            ),
          }}>
          Resolution
        </SelectItem>
        <SelectItem
          {...{
            note: "Change Better Readability preset FPS",
            disabled: false,
            options: fpsOptions,
            ...Utils.useSetting(
              SettingValues,
              "betterReadability.fps",
              defaultSettings.betterReadability.fps,
            ),
          }}>
          FPS
        </SelectItem>
      </Category>
      <ButtonItem
        {...{
          button: "Reset Settings",
          onClick: () => {
            //the setting doesnt get updated on pressing this button yet
            resetSettings();
          },
        }}>
        Press In-Case setting Crash or You want to reset settings to default.
      </ButtonItem>
    </div>
  );
};
