import patchManaggeStreamContextMenu from "./ManageStreamContextMenu";
import patchQualityUpdater from "./QualityUpdater";
import patchSettingValues from "./SettingValues";
import patchStreamQualitySelector from "./StreamQualitySelector";
import patchStreamUpsell from "./StreamUpsell";
import patchVoiceConnection from "./VoiceConnection";
export default (): void => {
  // patchManaggeStreamContextMenu();
  patchQualityUpdater();
  patchSettingValues();
  void patchStreamQualitySelector();
  void patchStreamUpsell();
  patchVoiceConnection();
};
