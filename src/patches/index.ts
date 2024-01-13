import patchManaggeStreamContextMenu from "./ManageStreamContextMenu";
import patchSettingValues from "./SettingValues";
import patchStreamQualitySelector from "./StreamQualitySelector";
import patchStreamSettings from "./StreamSettings";
import patchStreamUpsell from "./StreamUpsell";
import patchVideoQualityManager from "./VideoQualityManager";
import patchVoiceConnection from "./VoiceConnection";
import patchWebRTCUtils from "./WebRTCUtils";
export default (): void => {
  patchManaggeStreamContextMenu();
  patchSettingValues();
  void patchStreamQualitySelector();
  void patchStreamSettings();
  void patchStreamUpsell();
  patchVideoQualityManager();
  patchVoiceConnection();
  patchWebRTCUtils();
};
