import { components } from "replugged";
import { PluginLogger, SettingValues } from "../index";
const { ButtonItem, Category } = components;
import { defaultSettings, fpsOptions, resoOptions } from "../lib/consts";
import { StatedSelectItem } from "./StatedSelect";
import * as Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const resetSettings = (): void => {
  for (const key in defaultSettings) {
    PluginLogger.log(`Resetted ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const Settings = () => {
  return (
    <div>
      <Category {...{ title: "FPS", note: "Depends on your screen FPS", open: false }}>
        <StatedSelectItem
          {...{
            title: "FPS 15",
            note: "Replace 15 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[1] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: SettingValues.get("fps", defaultSettings.fps)[1],
          }}
        />
        <StatedSelectItem
          {...{
            title: "FPS 30",
            note: "Replace 30 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[2] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: SettingValues.get("fps", defaultSettings.fps)[2],
          }}
        />
        <StatedSelectItem
          {...{
            title: "FPS 60",
            note: "Replace 60 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[3] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: SettingValues.get("fps", defaultSettings.fps)[3],
          }}
        />
      </Category>
      <Category
        {...{ title: "Resolution", note: "Depends on your screen resolution", open: false }}>
        <StatedSelectItem
          {...{
            title: "480p",
            note: "Replace 480p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[1] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: SettingValues.get("resolution", defaultSettings.resolution)[1],
          }}
        />
        <StatedSelectItem
          {...{
            title: "720p",
            note: "Replace 720p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[2] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: SettingValues.get("resolution", defaultSettings.resolution)[2],
          }}
        />
        <StatedSelectItem
          {...{
            title: "1080p",
            note: "Replace 1080p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[3] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: SettingValues.get("resolution", defaultSettings.resolution)[3],
          }}
        />
        <StatedSelectItem
          {...{
            title: "1440p",
            note: "Replace 1440p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[3] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: SettingValues.get("resolution", defaultSettings.resolution)[4],
          }}
        />
      </Category>
      <Category {...{ title: "Preset Smoother Video", shown: false }}>
        <StatedSelectItem
          {...{
            title: "Resolution",
            note: "Change Smoother Video preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const smoothVideoValues = SettingValues.get(
                "smoothVideo",
                defaultSettings.smoothVideo,
              );
              smoothVideoValues.resolution = value;
              SettingValues.set("smoothVideo", smoothVideoValues);
            },
            value: SettingValues.get("smoothVideo", defaultSettings.smoothVideo).resolution,
          }}
        />
        <StatedSelectItem
          {...{
            title: "FPS",
            note: "Change smoother video preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              const smoothVideoValues = SettingValues.get(
                "smoothVideo",
                defaultSettings.smoothVideo,
              );
              smoothVideoValues.fps = value;
              SettingValues.set("smoothVideo", smoothVideoValues);
            },
            value: SettingValues.get("smoothVideo", defaultSettings.smoothVideo).fps,
          }}
        />
      </Category>
      <Category {...{ title: "Preset Better Readability", shown: false }}>
        <StatedSelectItem
          {...{
            title: "Resolution",
            note: "Change Better Readability preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              const betterReadabilityValues = SettingValues.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              betterReadabilityValues.resolution = value;
              SettingValues.set("betterReadability", betterReadabilityValues);
            },
            value: SettingValues.get("betterReadability", defaultSettings.betterReadability)
              .resolution,
          }}
        />

        <StatedSelectItem
          {...{
            title: "FPS",
            note: "Change Better Readability preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              const betterReadabilityValues = SettingValues.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              betterReadabilityValues.fps = value;
              SettingValues.set("betterReadability", betterReadabilityValues);
            },
            value: SettingValues.get("betterReadability", defaultSettings.betterReadability).fps,
          }}
        />
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
