import { React } from "replugged/common";
import { ButtonItem, Category, Divider, Notice, SelectItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings, fpsOptions, resoOptions, resoWithSource } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key], ".");
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const resetSettings = (forceUpdate?: () => void): void => {
  PluginLogger.log("Resetting PremiumScreenShare's Settings.");
  for (const key of Object.keys(SettingValues.all()))
    SettingValues.delete(key as keyof Types.Settings);
  registerSettings();
  forceUpdate?.();
};

export const Settings = () => {
  const [key, setKey] = React.useState<Number>();
  const forceUpdate = (): void => {
    setKey(Date.now());
  };
  const onClear = {
    get onClear() {
      return () => this.onChange("");
    },
  };
  return (
    <div key={`${key}`}>
      <Category title="FPS" note="Depends on your screen FPS" open={false}>
        <SelectItem
          note="Replace 15 FPS with custom FPS"
          clearable={true}
          disabled={false}
          options={fpsOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "fps.1", defaultSettings.fps[1])}>
          FPS 15
        </SelectItem>
        <SelectItem
          note="Replace 30 FPS with custom FPS"
          clearable={true}
          disabled={false}
          options={fpsOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "fps.2", defaultSettings.fps[2])}>
          FPS 30
        </SelectItem>
        <SelectItem
          note="Replace 60 FPS with custom FPS"
          clearable={true}
          disabled={false}
          options={fpsOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "fps.3", defaultSettings.fps[3])}>
          FPS 60
        </SelectItem>
      </Category>
      <Category title="Resolution" note="Depends on your screen resolution" open={false}>
        <SelectItem
          note="Replace 480p with custom resolution"
          clearable={true}
          disabled={false}
          options={resoOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "resolution.1", defaultSettings.resolution[1])}>
          480p
        </SelectItem>
        <SelectItem
          note="Replace 720p with custom resolution"
          clearable={true}
          disabled={false}
          options={resoOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "resolution.2", defaultSettings.resolution[2])}>
          720p
        </SelectItem>
        <SelectItem
          note="Replace 1080p with custom resolution"
          clearable={true}
          disabled={false}
          options={resoOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "resolution.3", defaultSettings.resolution[3])}>
          1080p
        </SelectItem>
        <SelectItem
          note="Replace 1440p with custom resolution"
          clearable={true}
          disabled={false}
          options={resoOptions}
          {...onClear}
          {...Utils.useSetting(SettingValues, "resolution.4", defaultSettings.resolution[4])}>
          1440p
        </SelectItem>
      </Category>
      <Category title="Preset Smoother Video" open={false}>
        <SelectItem
          note="Change Smoother Video preset resolution"
          disabled={false}
          options={resoWithSource}
          {...Utils.useSetting(
            SettingValues,
            "smoothVideo.resolution",
            defaultSettings.smoothVideo.resolution,
          )}>
          Resolution
        </SelectItem>
        <SelectItem
          note="Change smoother video preset FPS"
          disabled={false}
          options={fpsOptions}
          {...Utils.useSetting(SettingValues, "smoothVideo.fps", defaultSettings.smoothVideo.fps)}>
          FPS
        </SelectItem>
      </Category>
      <Category title="Preset Better Readability" open={false}>
        <SelectItem
          note="Change Better Readability preset resolution"
          disabled={false}
          options={resoWithSource}
          {...Utils.useSetting(
            SettingValues,
            "betterReadability.resolution",
            defaultSettings.betterReadability.resolution,
          )}>
          Resolution
        </SelectItem>
        <SelectItem
          note="Change Better Readability preset FPS"
          disabled={false}
          options={fpsOptions}
          {...Utils.useSetting(
            SettingValues,
            "betterReadability.fps",
            defaultSettings.betterReadability.fps,
          )}>
          FPS
        </SelectItem>
      </Category>
      <Notice messageType={Notice.Types.WARNING}>
        Resolution Above 1440p can cause flickering in streams.
      </Notice>
      <Divider
        style={{
          margin: "10px 0px 10px 0px",
        }}
      />
      <ButtonItem
        button="Reset Settings"
        onClick={() => {
          resetSettings(forceUpdate);
        }}>
        Press In-Case setting Crash or You want to reset settings to default.
      </ButtonItem>
    </div>
  );
};

export default { registerSettings, resetSettings, Settings };
