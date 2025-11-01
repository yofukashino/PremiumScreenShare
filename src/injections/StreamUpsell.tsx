import { util, webpack } from "replugged";
import { Button } from "replugged/components";
import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import Icons from "@Icons";
import type Types from "@Types";

const { default: StreamUpsell } = await import("@lib/RequiredModules/StreamUpsell");
const loader = webpack.getFunctionKeyBySource(StreamUpsell, ".PREMIUM_UPSELL_BANNER");

PluginInjector.after(StreamUpsell, loader, (_args, res) => {
  if (SettingValues.get("upsell", DefaultSettings.upsell)) return null;

  const Label = util.findInReactTree(res, (c: Types.ReactTree) =>
    c?.props?.children?.some?.((c) => c?.props?.className?.includes?.("upsellText")),
  ) as Types.ReactTree;

  if (Label) {
    const NitroIcon = Label.props.children[0];
    if (NitroIcon) NitroIcon.type = Icons.twitch;
    const MainText = Label.props.children[1];
    if (MainText) MainText.props.children = "Premium Experience by yofukashino_, Follow Twitch.";
  }

  const ButtonContainer = util.findInReactTree(res, (c: Types.ReactTree) =>
    c?.props?.children?.type?.toString()?.includes(".premiumIcon"),
  ) as Types.ReactTree;

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
