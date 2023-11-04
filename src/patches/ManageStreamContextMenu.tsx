import { PluginInjectorUtils } from "../index";
import audioSourceMenuItem from "../Components/MenuRadioItem";
import * as Types from "../types";
export const patchManaggeStreamContextMenu = (): void => {
  PluginInjectorUtils.addMenuItem(
    Types.DefaultTypes.ContextMenuTypes.ManageStreams,
    audioSourceMenuItem,
    0,
    0,
  );
};
