import { webpack } from "replugged";

export interface PartialApplicationStreamingOption {
  getApplicationFramerate: (fps: number) => number;
  getApplicationResolution: (resolution: number) => number;
  makeResolutionLabel: (resolution: number) => string;
}

export interface ApplicationStreamingOption extends PartialApplicationStreamingOption {
  ApplicationStreamFPS?: Record<string | number, string | number>;
  ApplicationStreamFPSButtons?: Array<{
    label: number;
    value: number;
  }>;
  ApplicationStreamFPSButtonsWithSuffixLabel?: Array<{
    label: string;
    value: number;
  }>;
  ApplicationStreamPresetValues?: {
    1: Array<{
      fps: number;
      resolution: number;
    }>;
    2: Array<{
      fps: number;
      resolution: number;
    }>;
    3: unknown[];
  };
  ApplicationStreamResolutionButtons?: Array<{
    label: number | string;
    value: number;
  }>;
  ApplicationStreamResolutionButtonsWithSuffixLabel?: Array<{
    label: string;
    value: number;
  }>;
  ApplicationStreamResolutions?: Record<string | number, string | number>;
  ApplicationStreamSettingRequirements?: Array<
    Array<{ resolution: number; fps: number; guildPremiumTier?: number; quality?: string }>
  >;
  GoLiveDeviceResolutionButtons?: Array<{
    label: number;
    value: number;
  }>;
}

export default await webpack
  .waitForModule<ApplicationStreamingOption>(webpack.filters.bySource("Unknown resolution: "), {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find ApplicationStreamingOption  Module");
  });
