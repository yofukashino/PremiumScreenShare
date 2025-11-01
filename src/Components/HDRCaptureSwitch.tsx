import { util } from "replugged";
import { Checkbox, Flex } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings } from "@consts";

export default (): React.ReactElement => (
  <Flex
    style={{
      marginTop: "16px",
      paddingLeft: "16px",
    }}>
    <Checkbox
      label="HDR Capture Mode"
      type="inverted"
      {...util.useSetting(SettingValues, "hdrCaptureMode", DefaultSettings.hdrCaptureMode)}
    />
  </Flex>
);
