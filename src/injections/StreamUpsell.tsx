import { Button } from "replugged/components";
import { PluginInjector } from "../index";

import Modules from "../lib/requiredModules";
import Icons from "../Components/Icons";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamUpsell = await Modules.StreamUpsellPromise;
  PluginInjector.after(StreamUpsell, "default", (_args, res: React.ReactElement & Types.Tree) => {
    const Label = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.children?.some?.((c) => c?.props?.className?.includes?.("upsellText")),
    ) as React.ReactElement & Types.Tree;
    if (Label) {
      const NitroIcon = Label.props.children[0];
      if (NitroIcon) NitroIcon.type = Icons.kofi;
      const MainText = Label.props.children[1];
      if (MainText) MainText.props.children = "Premium Experience by yofukashino_, Donations Open.";
    }
    const ButtonContainer = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
      c?.props?.children?.props?.iconClassName?.includes("premiumIcon"),
    ) as React.ReactElement & Types.Tree;
    if (ButtonContainer) {
      const {
        props: {
          children: {
            props: { className, iconClassName, size },
          },
        },
      } = ButtonContainer;
      ButtonContainer.props.children = (
        <Button
          onClick={() => open("https://ko-fi.com/yofukashino")}
          size={size}
          className={`${className ? `${className} ` : ""}kofi-button`}
          style={{ display: "flex", alignItems: "center" }}>
          <Icons.kofi className={iconClassName} />
          Buy KO-FI
        </Button>
      );
    }

    return res;
  });
};
