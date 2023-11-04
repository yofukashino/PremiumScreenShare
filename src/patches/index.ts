import { PluginInjector } from "../index";
import patchStreamQualitySelector from "./StreamQualitySelector";
import patchStreamUpsell from "./StreamUpsell";
import { patchManaggeStreamContextMenu } from "./ManageStreamContextMenu";
import { patchQualityUpdater } from "./QualityUpdater";
import { patchSettingSetter } from "./SettingValues";
import { patchVoiceConnection } from "./VoiceConnection";
export const applyInjections = (): void => {
  void patchStreamQualitySelector();
  void patchStreamUpsell();
  patchManaggeStreamContextMenu();
  patchQualityUpdater();
  patchSettingSetter();
  patchVoiceConnection();
};
export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
};
