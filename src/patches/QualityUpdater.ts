import { PluginInjector } from "../index";

import { streamingConstants } from "../lib/consts";

import { WebRTCUtils } from "../lib/requiredModules";

import * as Types from "../types";

export const patchQualityUpdater = (): void => {
  const maxResolution = Math.max(...streamingConstants().resolutionWithPresets);
  const maxFPS = Math.max(...streamingConstants().fpsWithPresets);
  const maxVideoQuality = Object.freeze({
    width: maxResolution * (16 / 9),
    height: maxResolution,
    framerate: maxFPS,
  });
  PluginInjector.before(WebRTCUtils.prototype, "updateVideoQuality", (_args: [], instance) => {
    const { videoQualityManager } = instance as unknown as Types.WebRTCUtils;
    videoQualityManager.options.videoBudget = maxVideoQuality;
    videoQualityManager.options.videoCapture = maxVideoQuality;
    for (const ladder in videoQualityManager.ladder.ladder) {
      videoQualityManager.ladder.ladder[ladder].framerate = maxVideoQuality.framerate;
      videoQualityManager.ladder.ladder[ladder].mutedFramerate = maxVideoQuality.framerate / 2;
    }
    for (const ladder of videoQualityManager.ladder.orderedLadder) {
      ladder.framerate = maxVideoQuality.framerate;
      ladder.mutedFramerate = maxVideoQuality.framerate / 2;
    }
  });
};
