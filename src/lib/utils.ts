import { util } from "replugged";

export const removeDuplicate = (item: unknown, pos: number, self: unknown[]): boolean => {
  return self.indexOf(item) === pos;
};

export const ascending = (a: number, b: number): number => {
  return a - b;
};

export const getBitrate = (
  resolution: number,
): { bitrateMax: number; bitrateMin: number; bitrateTarget: number } => {
  switch (resolution) {
    case 2160: {
      return {
        bitrateMax: 1280000000,
        bitrateMin: 80000000,
        bitrateTarget: 96000000,
      };
    }
    case 1440: {
      return {
        bitrateMax: 320000000,
        bitrateMin: 10000000,
        bitrateTarget: 24000000,
      };
    }
    case 1080: {
      return {
        bitrateMax: 213333333,
        bitrateMin: 6666666,
        bitrateTarget: 16000000,
      };
    }
    case 720: {
      return {
        bitrateMax: 94814814,
        bitrateMin: 2962962,
        bitrateTarget: 32000000,
      };
    }
    case 480: {
      return {
        bitrateMax: 43097642,
        bitrateMin: 1346800,
        bitrateTarget: 145454,
      };
    }
    case 360: {
      return {
        bitrateMax: 24348950,
        bitrateMin: 760903,
        bitrateTarget: 82177,
      };
    }
    case 240: {
      return {
        bitrateMax: 10821755,
        bitrateMin: 338179,
        bitrateTarget: 36523,
      };
    }
    case 144: {
      return {
        bitrateMax: 10821755,
        bitrateMin: 125251,
        bitrateTarget: 13527,
      };
    }
    default: {
      return {
        bitrateMax: 213333333,
        bitrateMin: 6666666,
        bitrateTarget: 16000000,
      };
    }
  }
};

export const getPidFromSourceId = (id: string): number | void => {
  const DiscordUtils = DiscordNative.nativeModules.requireModule("discord_utils");
  if (!DiscordUtils.getPidFromWindowHandle || !id) return;
  const [type, handle] = id.split(":");

  if (type === "window") {
    const pid = DiscordUtils.getPidFromWindowHandle(handle);
    return !pid ? void 0 : pid;
  }

  if (type.startsWith("screen")) return 1;
  return null;
};

export default {
  ...util,
  removeDuplicate,
  ascending,
  getBitrate,
  getPidFromSourceId,
};
