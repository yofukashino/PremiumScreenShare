import { common, components } from "replugged";
import { pss } from "../index.jsx";
const { React } = common;
const { SelectItem, Category } = components;
import { defaultSettings, fpsOptions, resoOptions } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (pss.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    pss.set(key, value);
  }
};
export const Settings = () => {
  const [FPS15, setFPS15] = React.useState(pss.get("fps", defaultSettings.fps)[1]);
  const [FPS30, setFPS30] = React.useState(pss.get("fps", defaultSettings.fps)[2]);
  const [FPS60, setFPS60] = React.useState(pss.get("fps", defaultSettings.fps)[3]);
  const [Resolution480, setResoltuion480] = React.useState(
    pss.get("resolution", defaultSettings.resolution)[1],
  );
  const [Resolution720, setResoltuion720] = React.useState(
    pss.get("resolution", defaultSettings.resolution)[2],
  );
  const [Resolution1080, setResoltuion1080] = React.useState(
    pss.get("resolution", defaultSettings.resolution)[3],
  );
  const [SmoothVideoResoltuion, setSmoothVideoResoltuion] = React.useState(
    pss.get("smoothVideo", defaultSettings.smoothVideo).resolution,
  );
  const [SmoothVideoFPS, setSmoothVideoFPS] = React.useState(
    pss.get("smoothVideo", defaultSettings.smoothVideo).fps,
  );
  const [BetterReadabilityResoltuion, setBetterReadabilityResoltuion] = React.useState(
    pss.get("betterReadability", defaultSettings.betterReadability).resolution,
  );
  const [BetterReadabilityFPS, setBetterReadabilityFPS] = React.useState(
    pss.get("betterReadability", defaultSettings.betterReadability).fps,
  );
  return (
    <div>
      <Category {...{ title: "FPS", note: "Depends on your screen FPS", open: false }}>
        <SelectItem
          {...{
            title: "FPS 15",
            note: "Replace 15 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS15(value);
              const fpsValues = pss.get("fps", defaultSettings.fps);
              fpsValues[1] = value;
              pss.set("fps", fpsValues);
            },
            value: FPS15,
          }}
        />
        <SelectItem
          {...{
            title: "FPS 30",
            note: "Replace 30 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS30(value);
              const fpsValues = pss.get("fps", defaultSettings.fps);
              fpsValues[2] = value;
              pss.set("fps", fpsValues);
            },
            value: FPS30,
          }}
        />
        <SelectItem
          {...{
            title: "FPS 60",
            note: "Replace 60 FPS with custom FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setFPS60(value);
              const fpsValues = pss.get("fps", defaultSettings.fps);
              fpsValues[3] = value;
              pss.set("fps", fpsValues);
            },
            value: FPS60,
          }}
        />
      </Category>
      <Category
        {...{ title: "Resolution", note: "Depends on your screen resolution", open: false }}>
        <SelectItem
          {...{
            title: "480p",
            note: "Replace 480p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion480(value);
              const resolutionValues = pss.get("resolution", defaultSettings.resolution);
              resolutionValues[1] = value;
              pss.set("resolution", resolutionValues);
            },
            value: Resolution480,
          }}
        />
        <SelectItem
          {...{
            title: "720p",
            note: "Replace 720p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion720(value);
              const resolutionValues = pss.get("resolution", defaultSettings.resolution);
              resolutionValues[2] = value;
              pss.set("resolution", resolutionValues);
            },
            value: Resolution720,
          }}
        />
        <SelectItem
          {...{
            title: "1080p",
            note: "Replace 1080p with custom resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion1080(value);
              const resolutionValues = pss.get("resolutio", defaultSettings.resolution);
              resolutionValues[3] = value;
              pss.set("resolution", resolutionValues);
            },
            value: Resolution1080,
          }}
        />
      </Category>
      <Category {...{ title: "Preset Smoother Video", shown: false }}>
        <SelectItem
          {...{
            title: "Resolution",
            note: "Change Smoother Video preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setSmoothVideoResoltuion(value);
              const smoothVideoValues = pss.get("smoothVideo", defaultSettings.smoothVideo);
              smoothVideoValues.resolution = value;
              pss.set("resolution", smoothVideoValues);
            },
            value: SmoothVideoResoltuion,
          }}
        />
        <SelectItem
          {...{
            title: "FPS",
            note: "Change smoother video preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setSmoothVideoFPS(value);
              const smoothVideoValues = pss.get("smoothVideo", defaultSettings.smoothVideo);
              smoothVideoValues.fps = value;
              pss.set("smoothVideo", smoothVideoValues);
            },
            value: SmoothVideoFPS,
          }}
        />
      </Category>
      <Category {...{ title: "Preset Better Readability", shown: false }}>
        <SelectItem
          {...{
            title: "Resolution",
            note: "Change Better Readability preset resolution",
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setBetterReadabilityResoltuion(value);
              const betterReadabilityValues = pss.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              smoothVideoValues.resolution = value;
              pss.set("resolution", betterReadabilityValues);
            },
            value: BetterReadabilityResoltuion,
          }}
        />
        <SelectItem
          {...{
            title: "FPS",
            note: "Change Better Readability preset FPS",
            clearable: true,
            disabled: false,
            options: fpsOptions,
            onChange: (value) => {
              setBetterReadabilityFPS(value);
              const betterReadabilityValues = pss.get(
                "betterReadability",
                defaultSettings.betterReadability,
              );
              betterReadabilityValues.fps = value;
              pss.set("betterReadability", betterReadabilityValues);
            },
            value: BetterReadabilityFPS,
          }}
        />
      </Category>
    </div>
  );
};
