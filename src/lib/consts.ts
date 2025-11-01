import { plugins } from "replugged";
import { i18n } from "replugged/common";
import { SettingValues } from "@this";
import Utils from "@Utils";

import type Types from "@Types";

export const DefaultSettings = {
  fps: {
    "15": "15",
    "30": "30",
    "60": "60",
  },
  resolution: {
    "720": "720",
    "1080": "1080",
    "1440": "1440",
  },
  smoothVideo: {
    resolution: "720",
    fps: "60",
  },
  betterReadability: {
    resolution: "0",
    fps: "60",
  },
  hdrCaptureMode: false,
  audioSource: "none",
  upsell: false,
};

export const StreamingConstants: Types.StreamingConstants = {
  get fps() {
    return Object.values(SettingValues.get("fps", DefaultSettings.fps))
      .map((fps) => Number(fps))
      .sort(Utils.ascending)
      .filter(Utils.removeDuplicate)
      .filter((f) => f);
  },
  get fpsWithPresets() {
    return [
      Number(SettingValues.get("betterReadability", DefaultSettings.betterReadability).fps),
      Number(SettingValues.get("smoothVideo", DefaultSettings.smoothVideo).fps),
      ...this.fps,
    ];
  },
  get resolution() {
    return [
      ...Object.values(SettingValues.get("resolution", DefaultSettings.resolution))
        .map((resolution) => Number(resolution))
        .sort(Utils.ascending)
        .filter(Utils.removeDuplicate)
        .filter((r) => r),
      0,
    ];
  },
  get resolutionWithPresets() {
    return [
      Number(SettingValues.get("betterReadability", DefaultSettings.betterReadability).resolution),
      Number(SettingValues.get("smoothVideo", DefaultSettings.smoothVideo).resolution),
      ...this.resolution,
    ];
  },
};

export const ApplicationStreamingPatched = Symbol.for("PATCHED");

export const PremiumApplicationStreamingValues = {
  get ApplicationStreamFPS() {
    return Object.assign(
      {},
      ...StreamingConstants.fps.map((fps) => {
        const label = `FPS_${fps}`;
        return { [fps]: label, [label]: fps };
      }),
    );
  },
  get ApplicationStreamFPSButtons() {
    return StreamingConstants.fps.map((fps) => ({
      value: fps,
      label: fps,
    }));
  },
  get ApplicationStreamFPSButtonsWithSuffixLabel() {
    return StreamingConstants.fps.map((fps) => ({
      value: fps,
      get label() {
        return i18n.intl.formatToPlainString(i18n.t.STREAM_FPS_OPTION, { value: fps });
      },
    }));
  },

  get ApplicationStreamPresetValues() {
    const smoothVideo = SettingValues.get("smoothVideo", DefaultSettings.smoothVideo);
    const betterReadability = SettingValues.get(
      "betterReadability",
      DefaultSettings.betterReadability,
    );
    return {
      1: [
        {
          resolution: Number(smoothVideo.resolution),
          fps: Number(smoothVideo.fps),
        },
      ],
      2: [
        {
          resolution: Number(betterReadability.resolution),
          fps: Number(betterReadability.fps),
        },
      ],
      3: [],
    };
  },

  get ApplicationStreamResolutionButtons() {
    return StreamingConstants.resolution.map((resolution) => ({
      value: resolution,
      get label() {
        return resolution === 0
          ? i18n.intl.formatToPlainString(i18n.t.SCREENSHARE_SOURCE)
          : resolution;
      },
    }));
  },
  get ApplicationStreamResolutionButtonsWithSuffixLabel() {
    return StreamingConstants.resolution.map((resolution) => ({
      value: resolution,
      get label() {
        return resolution === 0
          ? i18n.intl.formatToPlainString(i18n.t.SCREENSHARE_SOURCE)
          : i18n.intl.formatToPlainString(i18n.t.SCREENSHARE_RESOLUTION_ABBREVIATED, {
              resolution,
            });
      },
    }));
  },

  get ApplicationStreamResolutions() {
    return Object.assign(
      {},
      ...StreamingConstants.resolution.map((resolution) => {
        const label = `RESOLUTION_${resolution === 0 ? "SOURCE" : resolution}`;
        return { [resolution]: label, [label]: resolution };
      }),
    );
  },

  get ApplicationStreamSettingRequirements() {
    return StreamingConstants.resolutionWithPresets
      .map((resolution) =>
        StreamingConstants.fpsWithPresets.map((fps) => ({
          resolution,
          fps,
        })),
      )
      .flat(10);
  },

  get GoLiveDeviceResolutionButtons() {
    const resolutionSettings = SettingValues.get("resolution", DefaultSettings.resolution);
    return StreamingConstants.resolution
      .filter((resolution) => resolution !== Number(resolutionSettings[720]) && resolution !== 0)
      .map((resolution) => ({ value: resolution, label: resolution }));
  },
};

export const SoundshareSupported =
  DiscordNative.features.supports("soundshare") &&
  !DiscordNative.features.supports("native_screenshare_picker");

export const isDisabled = (): boolean =>
  plugins.getDisabled().includes("dev.tharki.PremiumScreenShare");
