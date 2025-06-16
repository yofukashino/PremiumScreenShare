import { PluginInjector } from "../index";
import { defaultParameters, streamingConstants } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import injectApplicationStreamingOption from "./ApplicationStreamingOption";
import injectPremiumQualityChecker from "./PremiumQualityChecker";
import injectManaggeStreamContextMenu from "./ManageStreamContextMenu";
import injectSettingValues from "./SettingValues";
import injectStreamOptions from "./StreamOptions";
import injectStreamQualitySelector from "./StreamQualitySelector";
import injectStreamRefreshModal from "./StreamRefreshModal";
import injectStreamSettings from "./StreamSettings";
import injectStreamUpsell from "./StreamUpsell";
import injectVideoQualityManager from "./VideoQualityManager";
import injectVoiceConnection from "./VoiceConnection";
import injectWebRTCUtils from "./WebRTCUtils";

export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  await Utils.saveModuleKeys();
  await Utils.saveDefaultParameters();
  injectApplicationStreamingOption();
  injectPremiumQualityChecker();
  injectManaggeStreamContextMenu();
  injectSettingValues();
  injectStreamOptions();
  void injectStreamQualitySelector();
  void injectStreamRefreshModal();
  void injectStreamSettings();
  void injectStreamUpsell();
  injectVideoQualityManager();
  injectVoiceConnection();
  injectWebRTCUtils();
  Utils.setCustomParameters(streamingConstants);
};

export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
  Utils.setStreamParameters(defaultParameters);
};

export default { applyInjections, removeInjections };
