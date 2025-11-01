import { PluginInjector } from "@this";
import { WebRTCConnection } from "@lib/RequiredModules";

PluginInjector.instead(WebRTCConnection.prototype, "applyVideoQualityMode", () => null);
