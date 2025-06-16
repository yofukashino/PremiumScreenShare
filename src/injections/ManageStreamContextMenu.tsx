import { PluginInjectorUtils } from "../index";
import ContextMenuEntry from "../Components/ManageStreamContextMenu";
import Types from "../types";
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.ManageStreams,
    ContextMenuEntry,
    0,
    0,
  );
};
