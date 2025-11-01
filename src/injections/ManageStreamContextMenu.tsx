import { PluginInjectorUtils } from "@this";
import ManageStreamContextMenu from "@components/ManageStreamContextMenu";
import Types from "@Types";

PluginInjectorUtils.addMenuItem(
  Types.DefaultTypes.ContextMenuTypes.ManageStreams,
  ManageStreamContextMenu,
  0,
  0,
);
