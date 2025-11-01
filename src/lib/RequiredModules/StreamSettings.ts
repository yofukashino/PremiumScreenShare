import { webpack } from "replugged";
import type Types from "@Types";

export type StreamSettings = Types.DefaultTypes.RawModule<
  Record<
    string,
    (props?: {
      selectedSource?: {
        id?: string;
      };
    }) => Types.ReactTree
  >
>;

export default await webpack
  .waitForModule<StreamSettings>(webpack.filters.bySource(".NOTIFY_STREAM_SETTING_UPDATE,"), {
    raw: true,
  })
  .then(({ exports }) => exports)
  .catch(() => {
    throw new Error("Failed To Find StreamSettings Module");
  });
