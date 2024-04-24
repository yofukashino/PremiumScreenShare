import { SelectItem } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings, fpsOptions, resoOptions, resoWithSource } from "../lib/consts";
import Utils from "../lib/utils";
export const FPS = () => (
  <>
    <SelectItem
      note="Replace 15 FPS with custom FPS"
      clearable={true}
      disabled={false}
      options={fpsOptions}
      {...Utils.useClearableSettings(SettingValues, "fps.1", defaultSettings.fps[1])}>
      FPS 15
    </SelectItem>
    <SelectItem
      note="Replace 30 FPS with custom FPS"
      clearable={true}
      disabled={false}
      options={fpsOptions}
      {...Utils.useClearableSettings(SettingValues, "fps.2", defaultSettings.fps[2])}>
      FPS 30
    </SelectItem>
    <SelectItem
      note="Replace 60 FPS with custom FPS"
      clearable={true}
      disabled={false}
      options={fpsOptions}
      {...Utils.useClearableSettings(SettingValues, "fps.3", defaultSettings.fps[3])}>
      FPS 60
    </SelectItem>
  </>
);
export const Resolution = () => (
  <>
    <SelectItem
      note="Replace 480p with custom resolution"
      clearable={true}
      disabled={false}
      options={resoOptions}
      {...Utils.useClearableSettings(SettingValues, "resolution.1", defaultSettings.resolution[1])}>
      480p
    </SelectItem>
    <SelectItem
      note="Replace 720p with custom resolution"
      clearable={true}
      disabled={false}
      options={resoOptions}
      {...Utils.useClearableSettings(SettingValues, "resolution.2", defaultSettings.resolution[2])}>
      720p
    </SelectItem>
    <SelectItem
      note="Replace 1080p with custom resolution"
      clearable={true}
      disabled={false}
      options={resoOptions}
      {...Utils.useClearableSettings(SettingValues, "resolution.3", defaultSettings.resolution[3])}>
      1080p
    </SelectItem>
    <SelectItem
      note="Replace 1440p with custom resolution"
      clearable={true}
      disabled={false}
      options={resoOptions}
      {...Utils.useClearableSettings(SettingValues, "resolution.4", defaultSettings.resolution[4])}>
      1440p
    </SelectItem>
  </>
);
export const SmoothVideo = () => (
  <>
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
  </>
);
export const BetterReadability = () => (
  <>
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
  </>
);

export default { FPS, Resolution, SmoothVideo, BetterReadability };
