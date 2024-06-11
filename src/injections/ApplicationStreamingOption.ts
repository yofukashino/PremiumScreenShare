import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
export default (): void => {
  const { ApplicationStreamingOption } = Modules;
  PluginInjector.instead(ApplicationStreamingOption, "getApplicationFramerate", ([fps], res) => {
    return fps > 0 ? fps : res(fps);
  });
  PluginInjector.instead(
    ApplicationStreamingOption,
    "getApplicationResolution",
    ([resolution], res) => {
      return resolution > 0 ? resolution : res(resolution);
    },
  );
};
