import { PluginInjector } from "../index";
import { StreamUpsellPromise } from "../lib/requiredModules";
import Icons from "../Components/Icons";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamUpsell = await StreamUpsellPromise;
  PluginInjector.after(StreamUpsell, "default", (_args, res: React.ReactElement & Types.Tree) => {
    if (res) res.props.onClick = () => Utils.openExternal("https://ko-fi.com/tharki");
    const NitroIcon = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.className?.includes?.("iconColor"),
    ) as React.ReactElement & Types.Tree;
    if (NitroIcon) NitroIcon.type = Icons.kofi;
    const MainText = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.className?.includes?.("upsellText"),
    ) as React.ReactElement & Types.Tree;
    if (MainText) MainText.props.children = "Premium Experience by Tharki, Donations Open.";
    const GetNitro = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.className?.includes?.("textLink"),
    ) as React.ReactElement & Types.Tree;
    if (GetNitro) GetNitro.props.children = "Buy Ko-Fi";

    return res;
  });
};
