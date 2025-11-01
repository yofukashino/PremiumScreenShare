import { StreamingConstants, isDisabled } from "@consts";
import Utils from "@Utils";

export const _getBirtate = (
  _width: number,
  height: number,
  _framerate: number,
): Record<string, number> => {
  if (isDisabled()) return;
  return Utils.getBitrate(height || screen.height);
};

export const _getFPS = (): number[] => {
  if (isDisabled()) return;
  return StreamingConstants.fps;
};

export const _getResolution = (
  orig: Array<{
    value: number;
  }>,
): Array<{ value: number; canUse: () => boolean }> => {
  if (isDisabled()) return;
  const source = orig.some((c) => c.value === 0);

  return StreamingConstants.resolution
    .filter((c) => source || c !== 0)
    .map((c) => ({
      value: c,
      canUse: () => true,
    }));
};
