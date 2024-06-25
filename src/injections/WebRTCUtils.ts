import { webpack } from "replugged";
import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const WebRTC = webpack.getFunctionBySource<Types.DefaultTypes.AnyFunction>(
    Modules.WebRTCConnection,
    "updateVideoQuality: ",
  );
  PluginInjector.instead(WebRTC.prototype, "applyVideoQualityMode", () => null);
};
