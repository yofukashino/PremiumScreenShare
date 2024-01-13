import { PluginInjectorUtils } from "../index";
import audioSourceMenuItem from "../Components/MenuRadioItem";
import Types from "../types";
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.ManageStreams,
    audioSourceMenuItem,
    0,
    0,
  );
};
