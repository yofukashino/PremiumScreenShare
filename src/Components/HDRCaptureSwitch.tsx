import { Checkbox, CheckboxItem, Flex } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
export default (): React.ReactElement => (
  <Flex
    style={{
      marginTop: "16px",
      paddingLeft: "16px",
    }}>
    <CheckboxItem
      {...Utils.useSetting(SettingValues, "hdrCaptureMode", defaultSettings.hdrCaptureMode)}
      type={Checkbox.Types.INVERTED}>
      HDR Capture Mode
    </CheckboxItem>
  </Flex>
);
