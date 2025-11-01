import { webpack } from "replugged";

export interface StreamSettingContext {
  use: () => Array<Record<string, unknown>> & [{ sourceType: string }];
}

const mod = await webpack
  .waitForModule(webpack.filters.bySource("Using uninitialized GoLiveModalContextDispatch"))
  .catch(() => {
    throw new Error("Failed To Find StreamSettingContext Module");
  });

export default {
  use: webpack.getFunctionBySource(mod, "return["),
};
