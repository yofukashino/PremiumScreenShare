import { PluginInjector } from "../index";
import { streamStoreKeys } from "../lib/consts";
import Modules from "../lib/requiredModules";
export default (): void => {
  const { ApplicationStreamingOption } = Modules;
  PluginInjector.instead(
    ApplicationStreamingOption,
    streamStoreKeys.getApplicationFramerate as "getApplicationFramerate",
    ([fps], res) => {
      return fps > 0 ? fps : res(fps);
    },
  );
  PluginInjector.instead(
    ApplicationStreamingOption,
    streamStoreKeys.getApplicationResolution as "getApplicationResolution",
    ([resolution], res) => {
      return resolution > 0 ? resolution : res(resolution);
    },
  );
};
