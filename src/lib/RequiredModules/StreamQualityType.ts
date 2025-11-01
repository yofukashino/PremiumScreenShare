import type Types from "@Types";
import { webpack } from "replugged";

export type StreamQualityType = Types.DefaultTypes.RawModule<Record<string, () => boolean>>;

export default await webpack
  .waitForModule<StreamQualityType>(
    webpack.filters.bySource(/\w+===\w+\.resolution&&\w+===\w+\.fps/),
    {
      timeout: 10000,
      raw: true,
    },
  )
  .then((r) => r.exports)
  .catch(() => {
    throw new Error("Failed To Find StreamQualityType  Module");
  });
