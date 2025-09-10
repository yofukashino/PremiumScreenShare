import { streamingConstants } from "./lib/consts";
import Utils from "./lib/utils";

export const _getBirtate = (_width, height, _framerate): Record<string, number> => {
  return Utils.getBitrate(height || screen.height);
};

export const _getFPS = (): typeof streamingConstants.fps => {
  return streamingConstants.fps;
};

export const _getResolution = (
  orig: Array<{
    value: number;
  }>,
): Array<{ value: number; canUse: () => boolean }> => {
  const source = orig.some((c) => c.value === 0);
  return streamingConstants.resolution
    .filter((c) => source || c !== 0)
    .map((c) => ({
      value: c,
      canUse: () => true,
    }));
};
