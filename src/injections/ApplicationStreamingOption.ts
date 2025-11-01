import { webpack } from "replugged";
import { PluginInjector } from "@this";
import {
  ApplicationStreamingPatched,
  PremiumApplicationStreamingValues,
  isDisabled,
} from "@consts";
import { ApplicationStreamingOption } from "@lib/RequiredModules";

const getApplicationFramerate = webpack.getFunctionKeyBySource(
  ApplicationStreamingOption,
  "Unknown frame rate:",
);

PluginInjector.instead(ApplicationStreamingOption, getApplicationFramerate, ([fps], res) => {
  return fps > 0 ? fps : res(fps);
});

const getApplicationResolution = webpack.getFunctionKeyBySource(
  ApplicationStreamingOption,
  "Unknown resolution:",
);

PluginInjector.instead(
  ApplicationStreamingOption,
  getApplicationResolution,
  ([resolution], res) => {
    return resolution > 0 ? resolution : res(resolution);
  },
);

ApplicationStreamingOption[ApplicationStreamingPatched] = false;

const ApplicationStreamingKeyMap: Record<string, string> = {};

const ApplicationStreamingValues: typeof ApplicationStreamingOption = {
  ...ApplicationStreamingOption,
};

for (const key in ApplicationStreamingOption) {
  if (typeof ApplicationStreamingOption[key] === "function") continue;

  Object.defineProperty(ApplicationStreamingOption, key, {
    get: () => {
      return isDisabled() || !ApplicationStreamingOption[ApplicationStreamingPatched]
        ? ApplicationStreamingValues[key]
        : (PremiumApplicationStreamingValues[ApplicationStreamingKeyMap[key]] ??
            ApplicationStreamingValues[key]);
    },
    set: (value: unknown) => {
      ApplicationStreamingValues[key] = value;
    },
  });

  const ApplicationStreamingValue = ApplicationStreamingOption[key];

  if (Object.hasOwnProperty.call(ApplicationStreamingValue, "FPS_5")) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamFPS";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.some((button) => button.label === 15)
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamFPSButtons";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.some((button) => button.label !== 15 && button.value === 15)
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamFPSButtonsWithSuffixLabel";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue?.[2]) &&
    ApplicationStreamingValue[2].some((preset) => preset.fps === 15)
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamPresetValues";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.some((button) => button.label === 720)
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamResolutionButtons";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.some((button) => button.label !== 720 && button.value === 720)
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamResolutionButtonsWithSuffixLabel";
    continue;
  }

  if (Object.hasOwnProperty.call(ApplicationStreamingValue, "RESOLUTION_SOURCE")) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamResolutions";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.some((requirement) =>
      Object.hasOwnProperty.call(requirement, "guildPremiumTier"),
    )
  ) {
    ApplicationStreamingKeyMap[key] = "ApplicationStreamSettingRequirements";
    continue;
  }

  if (
    Array.isArray(ApplicationStreamingValue) &&
    ApplicationStreamingValue.length === 3 &&
    ApplicationStreamingValue.some((button) => button.label === 720)
  ) {
    ApplicationStreamingKeyMap[key] = "GoLiveDeviceResolutionButtons";
    continue;
  }
}

ApplicationStreamingOption[ApplicationStreamingPatched] = true;
