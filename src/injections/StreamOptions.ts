import { PluginInjectorUtils } from "../index";
import ContextMenuEntry from "../Components/StreamOptions";
// import Types from "../types";
export default (): void => {
  PluginInjectorUtils.addMenuItem(
    // @ts-expect-error not added in types
    "stream-options",
    ContextMenuEntry,
    (menuProps) =>
      menuProps.children?.findIndex((c) =>
        c?.props?.children?.some?.((v) => v?.props?.id === "resolution"),
      ),
    -2,
  );
};
