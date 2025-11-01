import { PluginInjectorUtils } from "@this";
import StreamOptionsContextMenu from "@components/StreamOptionsContextMenu";

PluginInjectorUtils.addMenuItem(
  // @ts-expect-error not added in types
  "stream-options",
  StreamOptionsContextMenu,
  (menuProps) =>
    Array.isArray(menuProps.children) &&
    menuProps.children?.findIndex((c) =>
      c?.props?.children?.some?.((v) => v?.props?.id === "resolution"),
    ),
  -2,
);
