import { util } from "replugged";
import { Select, Stack } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";

const FPSOptions = [
  {
    label: "5 FPS",
    value: "5",
  },
  {
    label: "10 FPS",
    value: "10",
  },
  {
    label: "15 FPS",
    value: "15",
  },
  {
    label: "30 FPS",
    value: "30",
  },
  {
    label: "45 FPS",
    value: "45",
  },
  {
    label: "60 FPS",
    value: "60",
  },
  {
    label: "120 FPS",
    value: "120",
  },
  {
    label: "144 FPS",
    value: "144",
  },
  {
    label: "240 FPS",
    value: "240",
  },
  {
    label: "360 FPS",
    value: "360",
  },
];

const ResolutionOptions = [
  {
    label: "144p",
    value: "144",
  },
  {
    label: "240p",
    value: "240",
  },
  {
    label: "360p",
    value: "360",
  },
  {
    label: "480p",
    value: "480",
  },
  {
    label: "720p",
    value: "720",
  },
  {
    label: "1080p",
    value: "1080",
  },
  {
    label: "1440p",
    value: "1440",
  },
  {
    label: "2160p",
    value: "2160",
  },
];

const ResolutionWithSource = [
  {
    label: "Source",
    value: "0",
  },
  ...ResolutionOptions,
];

export const FPS = (): React.ReactElement => (
  <Stack gap={24}>
    {Object.keys(DefaultSettings.fps).map((fps: keyof typeof DefaultSettings.fps) => {
      return (
        <Select
          key={fps}
          label={`FPS ${fps}`}
          description={`Replace ${fps} FPS with custom FPS`}
          clearable={true}
          disabled={false}
          options={FPSOptions}
          {...util.useSetting(SettingValues, `fps.${fps}`)}
        />
      );
    })}
  </Stack>
);

export const Resolution = (): React.ReactElement => (
  <Stack gap={24}>
    {Object.keys(DefaultSettings.resolution).map(
      (resolution: keyof typeof DefaultSettings.resolution) => {
        return (
          <Select
            key={resolution}
            label={`${resolution}p`}
            description={`Replace ${resolution}p with custom resolution`}
            clearable={true}
            disabled={false}
            options={ResolutionOptions}
            {...util.useSetting(SettingValues, `resolution.${resolution}`)}
          />
        );
      },
    )}
  </Stack>
);

export const SmoothVideo = (): React.ReactElement => (
  <Stack gap={24}>
    <Select
      label="Resolution"
      description="Change Smoother Video preset resolution"
      disabled={false}
      options={ResolutionWithSource}
      {...util.useSetting(
        SettingValues,
        "smoothVideo.resolution",
        DefaultSettings.smoothVideo.resolution,
      )}
    />
    <Select
      label="FPS"
      description="Change smoother video preset FPS"
      disabled={false}
      options={FPSOptions}
      {...util.useSetting(SettingValues, "smoothVideo.fps", DefaultSettings.smoothVideo.fps)}
    />
  </Stack>
);

export const BetterReadability = (): React.ReactElement => (
  <Stack gap={24}>
    <Select
      label="Resolution"
      description="Change Better Readability preset resolution"
      disabled={false}
      options={ResolutionWithSource}
      {...util.useSetting(
        SettingValues,
        "betterReadability.resolution",
        DefaultSettings.betterReadability.resolution,
      )}
    />
    <Select
      label="FPS"
      description="Change Better Readability preset FPS"
      disabled={false}
      options={FPSOptions}
      {...util.useSetting(
        SettingValues,
        "betterReadability.fps",
        DefaultSettings.betterReadability.fps,
      )}
    />
  </Stack>
);

export default { FPS, Resolution, SmoothVideo, BetterReadability };
