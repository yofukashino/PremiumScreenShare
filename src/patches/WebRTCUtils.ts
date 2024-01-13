import { PluginInjector } from "../index";

import { WebRTCUtils } from "../lib/requiredModules";

export default (): void => {
  PluginInjector.instead(WebRTCUtils.default.prototype, "applyVideoQualityMode", () => null);
};
