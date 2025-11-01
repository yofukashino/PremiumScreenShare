import { webpack } from "replugged";
import type Types from "@Types";

export type StreamUpsell = Types.DefaultTypes.RawModule<
  Record<string, (props?: Record<string, unknown>) => Types.ReactTree>
>;

export default await webpack
  .waitForModule<StreamUpsell>(webpack.filters.bySource(".PREMIUM_UPSELL_BANNER,"), {
    raw: true,
  })
  .then((r) => r.exports)
  .catch(() => {
    throw new Error("Failed To Find StreamUpsell Module");
  });
