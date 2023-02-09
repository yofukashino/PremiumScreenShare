import { common, components } from "replugged";
import { SettingValues } from "../index.jsx";
const { React } = common;
const { SelectItem, Category } = components;
import { defaultSettings, fpsOptions, resoOptions } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (SettingValues.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    SettingValues.set(key, value);
  }
};
export const Settings = () => {
  const [FPS15, setFPS15] = React.useState(SettingValues.get("fps", defaultSettings.fps)[1]);
  const [FPS30, setFPS30] = React.useState(SettingValues.get("fps", defaultSettings.fps)[2]);
  const [FPS60, setFPS60] = React.useState(SettingValues.get("fps", defaultSettings.fps)[3]);
  const [Resolution480, setResoltuion480] = React.useState(
    SettingValues.get("resolution", defaultSettings.resolution)[1],
  );
  const [Resolution720, setResoltuion720] = React.useState(
    SettingValues.get("resolution", defaultSettings.resolution)[2],
  );
  const [Resolution1080, setResoltuion1080] = React.useState(
    SettingValues.get("resolution", defaultSettings.resolution)[3],
  );
  const [SmoothVideoResoltuion, setSmoothVideoResoltuion] = React.useState(
    SettingValues.get("smoothVideo", defaultSettings.smoothVideo).resolution,
  );
  const [SmoothVideoFPS, setSmoothVideoFPS] = React.useState(
    SettingValues.get("smoothVideo", defaultSettings.smoothVideo).fps,
  );
  const [BetterReadabilityResoltuion, setBetterReadabilityResoltuion] = React.useState(
    SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution,
  );
  const [BetterReadabilityFPS, setBetterReadabilityFPS] = React.useState(
    SettingValues.get("betterReadability", defaultSettings.betterReadability).fps,
  );
  return (
    <div>
      <Category {...{ title: "FPS", note: "Depends on your screen FPS", open: false }}>
        <SelectItem
          {...{
            note: "Replace 15 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS15(value);
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[1] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: FPS15,
          }}>
          {" "}
          FPS 15
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 30 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS30(value);
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[2] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: FPS30,
          }}>
          {" "}
          FPS 30
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 60 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS60(value);
              const fpsValues = SettingValues.get("fps", defaultSettings.fps);
              fpsValues[3] = value;
              SettingValues.set("fps", fpsValues);
            },
            value: FPS60,
          }}>
          {" "}
          FPS 60{" "}
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
            onChange: (value) => {
              setResoltuion480(value);
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[1] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: Resolution480,
          }}>
          {" "}
          480p{" "}
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 720p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion720(value);
              const resolutionValues = SettingValues.get("resolution", defaultSettings.resolution);
              resolutionValues[2] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: Resolution720,
          }}>
          {" "}
          720p{" "}
        </SelectItem>
        <SelectItem
          {...{
            note: "Replace 1080p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion1080(value);
              const resolutionValues = SettingValues.get("resolutio", defaultSettings.resolution);
              resolutionValues[3] = value;
              SettingValues.set("resolution", resolutionValues);
            },
            value: Resolution1080,
          }}>
          {" "}
          1080p{" "}
        </SelectItem>
      </Category>
      <Category {...{ title: "Preset Smoother Video", shown: false }}>
        <SelectItem
          {...{
            note: "Change Smoother Video preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setSmoothVideoResoltuion(value);
              const smoothVideoValues = SettingValues.get(
                "smoothVideo",
                defaultSettings.smoothVideo,
              );
              smoothVideoValues.resolution = value;
              SettingValues.set("resolution", smoothVideoValues);
            },
            value: SmoothVideoResoltuion,
          }}>
          {" "}
          Resolution{" "}
        </SelectItem>
        <SelectItem
          {...{
            note: "Change smoother video preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setSmoothVideoFPS(value);
              const smoothVideoValues = SettingValues.get(
                "smoothVideo",
                defaultSettings.smoothVideo,
              );
              smoothVideoValues.fps = value;
              SettingValues.set("smoothVideo", smoothVideoValues);
            },
            value: SmoothVideoFPS,
          }}>
          {" "}
          FPS{" "}
        </SelectItem>
      </Category>
      <Category {...{ title: "Preset Better Readability", shown: false }}>
        <SelectItem
          {...{
            note: "Change Better Readability preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setBetterReadabilityResoltuion(value);
              const betterReadabilityValues = SettingValues.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              smoothVideoValues.resolution = value;
              SettingValues.set("resolution", betterReadabilityValues);
            },
            value: BetterReadabilityResoltuion,
          }}>
          {" "}
          Resolution
        </SelectItem>
        <SelectItem
          {...{
            note: "Change Better Readability preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setBetterReadabilityFPS(value);
              const betterReadabilityValues = SettingValues.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              betterReadabilityValues.fps = value;
              SettingValues.set("betterReadability", betterReadabilityValues);
            },
            value: BetterReadabilityFPS,
          }}>
          {" "}
          FPS{" "}
        </SelectItem>
      </Category>
    </div>
  );
};
