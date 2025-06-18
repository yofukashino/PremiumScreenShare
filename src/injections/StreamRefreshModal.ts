import { PluginInjector } from "../index";
import { streamingConstants } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default async (): Promise<void> => {
  const StreamRefreshModal = await Modules.StreamRefreshModalPromise;
  const fps = Object.values(StreamRefreshModal).find(
    (c) => Array.isArray(c) && c?.every((v) => !v || !isNaN(v)),
  );
  if (!Reflect.getOwnPropertyDescriptor(fps, "map"))
    Object.defineProperty(fps, "map", {
      value: Array.prototype.map.bind(fps),
      enumerable: false,
      configurable: true,
      writable: true,
    });

  PluginInjector.after(fps, "map", ([fn]: [() => unknown]) => {
    return streamingConstants.fps.map(fn);
  });

  const resolution = Object.values(StreamRefreshModal).find(
    (c) =>
      Array.isArray(c) &&
      c?.some((v) => v?.canUse?.toString()?.includes?.(".CAMERA") && v.value === 0),
  );
  if (!Reflect.getOwnPropertyDescriptor(resolution, "filter"))
    Object.defineProperty(resolution, "filter", {
      value: Array.prototype.filter.bind(resolution),
      enumerable: false,
      configurable: true,
      writable: true,
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
