import { PluginInjector } from "../index";
import { StreamSettingsPromise } from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamSettings = await StreamSettingsPromise;
  PluginInjector.after(
    StreamSettings,
    "default",
    ([{ selectedSource }], res: React.ReactElement & Types.Tree) => {
      const SourceContainer = Utils.findInReactTree(res, (c: React.ReactElement & Types.Tree) =>
        c?.props?.children?.some((v) =>
          v?.type?.toString()?.includes(".Messages.GO_LIVE_MODAL_ENABLE_SCREEN_SOUNDSHARE_LABEL"),
        ),
      ) as React.ReactElement & Types.Tree;
      if (SourceContainer?.props)
        SourceContainer.props.children = SourceContainer.props.children.filter(
          (v) =>
            !v?.type
              ?.toString()
              ?.includes(".Messages.GO_LIVE_MODAL_ENABLE_SCREEN_SOUNDSHARE_LABEL"),
        );
      const qualitySelectorElement = res.props.children.find((c) => Boolean(c?.props?.onFPSChange));
      if (qualitySelectorElement?.props)
        qualitySelectorElement.props.isScreen = selectedSource?.id?.includes("screen-handle:");
      return res;
    },
  );
};
