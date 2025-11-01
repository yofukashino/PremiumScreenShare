import { webpack } from "replugged";
import type Types from "@Types";

export type StreamQualitySelector = Types.DefaultTypes.RawModule<
  Record<string, (props?: { isScreen?: boolean }) => Types.ReactTree>
>;

export default await webpack
  .waitForModule<StreamQualitySelector>(
    webpack.filters.bySource("StreamSettings: user cannot be undefined"),
    {
      raw: true,
    },
  )
  .then(({ exports }) => exports)
  .catch(() => {
    throw new Error("Failed To Find StreamQualitySelector Module");
  });
