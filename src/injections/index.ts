import { PluginInjector, PluginLogger } from "@this";
import Modules, { ApplicationStreamingOption } from "@lib/RequiredModules";
import { ApplicationStreamingPatched } from "@consts";

const InjectionNames = [
  "ApplicationStreamingOption.ts",
  "ManageStreamContextMenu.tsx",
  "StreamOptions.ts",
  "StreamQualityType.ts",
  "VoiceConnection.ts",
  "WebRTCConnection.ts",
] as const;

const LazyInjectionNames = [
  "StreamQualitySelector.tsx",
  "StreamSettings.tsx",
  "StreamUpsell.tsx",
] as const;

export const applyInjections = async (): Promise<void> => {
  try {
    await Modules.loadModules();
    await Promise.all(InjectionNames.map((name) => import(`./${name}`)));
    void Promise.all(LazyInjectionNames.map((name) => import(`./${name}`)));
  } catch (err) {
    PluginLogger.error(err);
  }
};

export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
  delete ApplicationStreamingOption[ApplicationStreamingPatched];
};

export default { applyInjections, removeInjections };
