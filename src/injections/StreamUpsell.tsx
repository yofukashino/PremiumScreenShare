import { webpack } from "replugged";
import { Button } from "replugged/components";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Icons from "../Components/Icons";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamUpsell = await Modules.StreamUpsellPromise;
  const loader = webpack.getFunctionKeyBySource(StreamUpsell, ".PREMIUM_UPSELL_BANNER");
  PluginInjector.after(StreamUpsell, loader, (_args, res: React.ReactElement & Types.Tree) => {
    if (SettingValues.get("upsell", defaultSettings.upsell)) return null;
    const Label = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.children?.some?.((c) => c?.props?.className?.includes?.("upsellText")),
    ) as React.ReactElement & Types.Tree;
    if (Label) {
      const NitroIcon = Label.props.children[0];
      if (NitroIcon) NitroIcon.type = Icons.twitch;
      const MainText = Label.props.children[1];
      if (MainText) MainText.props.children = "Premium Experience by yofukashino_, Follow Twitch.";
    }
    console.log(res);
    const ButtonContainer = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.children?.type?.toString()?.includes(".premiumIcon"),
    ) as React.ReactElement & Types.Tree;
    if (ButtonContainer) {
      const {
        props: { className, iconClassName, size },
      } = ButtonContainer.props.children.type({});
      ButtonContainer.props.children = (
        <Button
          onClick={() => open("https://twitch.tv/yofukashino_")}
          size={size}
          className={`${className ? `${className} ` : ""}twitch-button`}
          style={{ display: "flex", alignItems: "center" }}>
          <Icons.twitch className={iconClassName} />
          Follow Twitch
        </Button>
      );
    }

    return res;
  });
};
