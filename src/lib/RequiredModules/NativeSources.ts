import { webpack } from "replugged";

import type { MediaEngine } from "./MediaEngineStore";

export type GetNativeSources = (
  engine: MediaEngine,
  type: Partial<["window", "screen"]>,
  size: {
    width: number;
    height: number;
  },
) => Promise<
  Array<{
    name: string;
    id: string;
    url: string;
  }>
>;

export interface NativeSources {
  get: GetNativeSources;
}

const getNativeSources = await webpack
  .waitForModule<GetNativeSources>(
    webpack.filters.bySource("Can't get desktop sources outside of native app"),
    {
      timeout: 10000,
    },
  )
  .catch(() => {
    throw new Error("Failed To Find getNativeScreens Module");
  });

export default {
  get: getNativeSources,
};
