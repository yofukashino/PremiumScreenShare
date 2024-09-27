import { React } from "replugged/common";
import { ButtonItem, Category, Divider, Notice, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import StreamSetting from "./StreamSetting";
import Utils from "../lib/utils";
import Types from "../types";
export const registerSettings = (): void => {
  const resolutions = SettingValues.get("resolution");
  if (resolutions[4]) {
    PluginLogger.log("Removing 480p as it's deprecated by discord.");
    SettingValues.set(
      "resolution",
      Object.entries(resolutions).reduce((acc, [key, val]: [string, string]) => {
        if (resolutions[1] === val) return acc;
        acc[Number(key) - 1] = val;
        return acc;
      }, {} as Record<1 | 2 | 3, string>),
    );
  }
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
  const [key, setKey] = React.useState<string>();
  const forceUpdate = (): void => {
    setKey(`${Date.now()}`);
  };

  return (
    <div>
      <Category title="FPS" note="Depends on your screen FPS" open={false}>
        <StreamSetting.FPS key={key} />
      </Category>
      <Category title="Resolution" note="Depends on your screen resolution" open={false}>
        <StreamSetting.Resolution key={key} />
      </Category>
      <Category title="Preset Smoother Video" open={false}>
        <StreamSetting.SmoothVideo key={key} />
      </Category>
      <Category title="Preset Better Readability" open={false}>
        <StreamSetting.BetterReadability key={key} />
      </Category>
      <Notice messageType={Notice.Types.WARNING}>
        Resolution Above 1440p can cause flickering in streams.
      </Notice>
      <Divider
        style={{
          margin: "10px 0px 10px 0px",
        }}
      />
      <SwitchItem
        note="Disable Upsell Completely in Streaming Modal"
        {...Utils.useSetting(SettingValues, "upsell", defaultSettings.upsell)}>
        Disable Upsell
      </SwitchItem>
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
