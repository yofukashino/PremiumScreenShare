import { webpack } from "replugged";
import { PluginInjector } from "@this";
import { StreamQualityType } from "@lib/RequiredModules";

const isPremium = webpack.getFunctionKeyBySource(StreamQualityType, "return");

PluginInjector.after(StreamQualityType, isPremium, () => {
  return true;
});
