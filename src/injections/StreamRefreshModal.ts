import { PluginInjector } from "../index";
import { streamingConstants } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default async (): Promise<void> => {
  const StreamRefreshModal = await Modules.StreamRefreshModalPromise;
  const fps = Object.values(StreamRefreshModal).find(
    (c) => Array.isArray(c) && c?.every((v) => !v || !isNaN(v)),
  );
  console.log(StreamRefreshModal, fps);
  Object.defineProperty(fps, "map", {
    value: Array.prototype.map.bind(fps),
    enumerable: false,
    configurable: true,
  });

  PluginInjector.after(fps, "map", ([fn]: [() => unknown]) => {
    return streamingConstants.fps.map(fn);
  });

  const resolution = Object.values(StreamRefreshModal).find(
    (c) =>
      Array.isArray(c) &&
      c?.some((v) => v?.canUse?.toString()?.includes?.(".CAMERA") && v.value === 0),
  );

  Object.defineProperty(resolution, "filter", {
    value: Array.prototype.filter.bind(fps),
    enumerable: false,
    configurable: true,
  });

  PluginInjector.after(resolution, "filter", (_args, values) => {
    const source = values.some((c) => c.value === 0);
    return streamingConstants.resolution
      .filter((c) => source || c !== 0)
      .map((c) => ({
        value: c,
        canUse: () => true,
      }));
  });
};
