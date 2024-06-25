import { Flex, CheckboxItem } from "replugged/components";
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
      {...Utils.useSetting(SettingValues, "hdrCaptureMode", defaultSettings.hdrCaptureMode)}>
      HDR Capture Mode
    </CheckboxItem>
  </Flex>
);
