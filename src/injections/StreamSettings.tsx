import { util, webpack } from "replugged";
import { PluginInjector } from "@this";
import type Types from "@Types";

const { default: StreamSettings } = await import("@lib/RequiredModules/StreamSettings");
const loader = webpack.getFunctionKeyBySource(StreamSettings, ".getVoiceChannelId()");

PluginInjector.after(StreamSettings, loader, ([{ selectedSource }], res) => {
  const SourceContainer = util.findInReactTree(res, (c: Types.ReactTree) =>
    c?.props?.children?.some?.((v) => v?.type?.toString()?.includes('.id.startsWith("screen")')),
  ) as Types.ReactTree;

  if (selectedSource?.id?.startsWith("screen") && SourceContainer?.props)
    SourceContainer.props.children = SourceContainer.props.children.filter(
      (v) => !v?.type?.toString()?.includes("screen:"),
    );

  const qualitySelectorElement = res.props.children.find((c) => Boolean(c?.props?.onFPSChange));
  if (qualitySelectorElement?.props)
    qualitySelectorElement.props.isScreen = selectedSource?.id?.startsWith("screen");

  return res;
});
