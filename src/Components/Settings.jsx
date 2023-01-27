import { common, components, webpack } from "replugged";
import { pss } from "../index.jsx";
const { React } = common;
const { Text } = components;
import { defaultSettings, fpsOptions, resoOptions } from "../lib/consts.jsx";
const searchableSelectModule = webpack.getBySource(".maxVisibleItems");
const searchableSelectKey = Object.keys(searchableSelectModule).find((m) =>
  [".onChange,", ".jsx)", "isSelected:function"].every((s) =>
    searchableSelectModule[m].toString().includes(s),
  ),
);
const Select = searchableSelectModule[searchableSelectKey];
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
      <div
        {...{
          style: {
            padding: "50px 50px 0px 50px",
          },
        }}>
        <Text
          {...{
            style: {
              padding: "0px 10px 5px 0px",
            },
          }}>
          FPS
        </Text>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
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
          }}></Select>
      </div>

      <div
        {...{
          style: {
            padding: "50px 50px 0px 50px",
          },
        }}>
        <Text
          {...{
            style: {
              padding: "0px 10px 5px 0px",
            },
          }}>
          Resolution
        </Text>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
            clearable: true,
            disabled: false,
            options: resoOptions,
            onChange: (value) => {
              setResoltuion1080(value);
              const resolutionValues = pss.get("resolution", defaultSettings.resolution);
              resolutionValues[3] = value;
              pss.set("resolution", resolutionValues);
            },
            value: Resolution1080,
          }}></Select>
      </div>

      <div
        {...{
          style: {
            padding: "50px 50px 0px 50px",
          },
        }}>
        <Text
          {...{
            style: {
              padding: "0px 10px 5px 0px",
            },
          }}>
          Smooth Video Preset
        </Text>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
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
          }}></Select>
      </div>

      <div
        {...{
          style: {
            padding: "50px 50px 0px 50px",
          },
        }}>
        <Text
          {...{
            style: {
              padding: "0px 10px 5px 0px",
            },
          }}>
          Better Readability Preset
        </Text>
        <Select
          {...{
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
          }}></Select>
        <Select
          {...{
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
          }}></Select>
      </div>
    </div>
  );
};
