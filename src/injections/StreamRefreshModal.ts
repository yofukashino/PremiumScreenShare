import { PluginInjector } from "../index";
import { streamingConstants } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default async (): Promise<void> => {
  const StreamRefreshModal = await Modules.StreamRefreshModalPromise;
  const fps = Object.values(StreamRefreshModal).find(
    (c) => Array.isArray(c) && c?.every((v) => !isNaN(v)),
  );
  const resolution = Object.values(StreamRefreshModal).find(
    (c) =>
      Array.isArray(c) &&
      c?.some((v) => v?.canUse?.toString()?.includes?.(".CAMERA") && v.value === 0),
  );
  PluginInjector.after(fps, "map", ([fn]: [() => unknown]) => {
    return streamingConstants.fps.map(fn);
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
