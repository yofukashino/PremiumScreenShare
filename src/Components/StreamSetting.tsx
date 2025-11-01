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

export const FPS = (): React.ReactElement => {
  const [FPS15, setFPS15] = util.useSettingArray(SettingValues, "fps.15");
  const [FPS30, setFPS30] = util.useSettingArray(SettingValues, "fps.30");
  const [FPS60, setFPS60] = util.useSettingArray(SettingValues, "fps.60");
  return (
    <Stack gap={24}>
      <Select
        label="FPS 15"
        description="Replace 15 FPS with custom FPS"
        clearable={true}
        disabled={false}
        options={FPSOptions}
        value={FPS15}
        onChange={setFPS15}
      />

      <Select
        label="FPS 30"
        description="Replace 30 FPS with custom FPS"
        clearable={true}
        disabled={false}
        options={FPSOptions}
        value={FPS30}
        onChange={setFPS30}
      />
      <Select
        label="FPS 60"
        description="Replace 60 FPS with custom FPS"
        clearable={true}
        disabled={false}
        options={FPSOptions}
        value={FPS60}
        onChange={setFPS60}
      />
    </Stack>
  );
};

export const Resolution = (): React.ReactElement => {
  const [Resolution720, setResolution720] = util.useSettingArray(SettingValues, "resolution.720");
  const [Resolution1080, setResolution1080] = util.useSettingArray(
    SettingValues,
    "resolution.1080",
  );
  const [Resolution1440, setResolution1440] = util.useSettingArray(
    SettingValues,
    "resolution.1440",
  );

  return (
    <Stack gap={24}>
      <Select
        label="720p"
        description="Replace 720p with custom resolution"
        clearable={true}
        disabled={false}
        options={ResolutionOptions}
        value={Resolution720}
        onChange={setResolution720}
      />
      <Select
        label="1080p"
        description="Replace 1080p with custom resolution"
        clearable={true}
        disabled={false}
        options={ResolutionOptions}
        value={Resolution1080}
        onChange={setResolution1080}
      />
      <Select
        label="1440p"
        description="Replace 1440p with custom resolution"
        clearable={true}
        disabled={false}
        options={ResolutionOptions}
        value={Resolution1440}
        onChange={setResolution1440}
      />
    </Stack>
  );
};
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
