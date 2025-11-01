import { util } from "replugged";
import { React, classNames, marginStyles } from "replugged/common";
import { Button, ButtonItem, Category, Divider, Notice, Stack, Switch } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings } from "@consts";

import StreamSetting from "@components/StreamSetting";

const removeDeprecatedSettings = (): void => {
  const resolutions = SettingValues.get("resolution");

  if (Object.keys(resolutions).some((r) => ["1", "2", "3"].includes(r))) {
    type Resolutions = typeof resolutions;
    PluginLogger.log("Removing deprecated resolution setting keys.");
    SettingValues.set(
      "resolution",
      Object.entries({ ...DefaultSettings.resolution, ...resolutions }).reduce(
        (acc, [key, val]: [string, string]) => {
          if (["1", "2", "3"].includes(key)) return acc;
          acc[key] = val;
          return acc;
        },
        {} as Resolutions,
      ),
    );
  }

  const fps = SettingValues.get("fps");

  if (Object.keys(fps).some((r) => ["1", "2", "3"].includes(r))) {
    type FPS = typeof fps;
    PluginLogger.log("Removing deprecated fps setting keys.");
    SettingValues.set(
      "fps",
      Object.entries({ ...DefaultSettings.fps, ...fps }).reduce(
        (acc, [key, val]: [string, string]) => {
          if (["1", "2", "3"].includes(key)) return acc;
          acc[key] = val;
          return acc;
        },
        {} as FPS,
      ),
    );
  }
};

export const registerSettings = (): void => {
  removeDeprecatedSettings();

  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const resetSettings = (forceUpdate?: () => void): void => {
  PluginLogger.log("Resetting PremiumScreenShare's Settings.");
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  for (const key in DefaultSettings) SettingValues.delete(key as key);
  registerSettings();
  forceUpdate?.();
};

export const Settings = (): React.ReactElement => {
  const [key, setKey] = React.useState<string>();
  const forceUpdate = (): void => {
    setKey(`${Date.now()}`);
  };

  return (
    <Stack gap={24}>
      <Category label="FPS" description="Depends on your screen FPS" open={false}>
        <StreamSetting.FPS key={key} />
      </Category>
      <Category label="Resolution" description="Depends on your screen resolution" open={false}>
        <StreamSetting.Resolution key={key} />
      </Category>
      <Category label="Preset Smoother Video" open={false}>
        <StreamSetting.SmoothVideo key={key} />
      </Category>
      <Category label="Preset Better Readability" open={false}>
        <StreamSetting.BetterReadability key={key} />
      </Category>
      <Notice messageType={Notice.Types.WARNING}>
        Resolution Above 1440p can cause flickering in streams.
      </Notice>
      <Divider className={classNames(marginStyles.marginBottom8, marginStyles.marginTop8)} />
      <Switch
        label="Disable Upsell"
        description="Disable Upsell Completely in Streaming Modal"
        {...util.useSetting(SettingValues, "upsell", DefaultSettings.upsell)}
      />
      <ButtonItem
        color={Button.Colors.RED}
        button="Reset"
        label="Reset Settings"
        description="Press In-Case setting Crash or You want to reset settings to default."
        onClick={() => {
          resetSettings(forceUpdate);
        }}
      />
    </Stack>
  );
};

export default { registerSettings, resetSettings, Settings };
