import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import { webpack } from "replugged";
export default (): void => {
  const { PremiumQualityChecker } = Modules;
  const isPremium = webpack.getFunctionKeyBySource(PremiumQualityChecker, "return");
  PluginInjector.after(PremiumQualityChecker, isPremium, () => {
    return true;
  });
};
