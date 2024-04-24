import { PluginInjector } from "../index";

import Modules from "../lib/requiredModules";

export default (): void => {
  PluginInjector.instead(
    Modules.WebRTCConnection.default.prototype,
    "applyVideoQualityMode",
    () => null,
  );
};
