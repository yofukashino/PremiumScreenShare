import { util, webpack } from "replugged";
import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import AudioSourcePicker from "@components/AudioSourcePicker";
import HDRCaptureSwitch from "@components/HDRCaptureSwitch";
import type Types from "@Types";

const ResolutionRegex =
  // eslint-disable-next-line no-misleading-character-class
  /[\u0028\uFF08\u207D\u208D\u2768\u276A\u276B\u2E28\uFE59\uFF5F]+(?!FPS)[a-zA-ZÀ-ÖØ-öø-ÿĀ-žА-яЁёԱ-֏ऀ-৿਀-૿଀-୿஀-௿ఀ-೿ഀ-ൿ඀-෿ก-๿຀-຿က-ဿ၀-ၿჀ-ჿḀ-῿\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]+[\u0029\uFF09\u207E\u208E\u2769\u276B\u276C\u2E29\uFE5A\uFF60]+/g;

const { default: StreamQualitySelector } = await import(
  "@lib/RequiredModules/StreamQualitySelector"
);

const loader = webpack.getFunctionKeyBySource(
  StreamQualitySelector,
  "StreamSettings: user cannot be undefined",
);
PluginInjector.after(StreamQualitySelector, loader, ([{ isScreen } = { isScreen: false }], res) => {
  const children = res?.props?.children;
  if (children) {
    res.props.children = Array.isArray(children) ? children : [children];
    const arrayChildren = res.props.children;
    if (!arrayChildren.some((c) => c?.type?.toString()?.includes("audioSource")) && isScreen)
      arrayChildren.unshift(<AudioSourcePicker />);
    if (!arrayChildren.some((c) => c?.type?.toString()?.includes("hdrCaptureMode")))
      arrayChildren.unshift(<HDRCaptureSwitch />);
  }

  const BetterTextReadability = util.findInReactTree(
    res,
    (c: Types.ReactTree) =>
      typeof c?.props?.title === "string" && typeof c?.props?.children?.props?.variant === "string",
  ) as Types.ReactTree;

  if (BetterTextReadability) {
    const BetterReadability = SettingValues.get(
      "betterReadability",
      DefaultSettings.betterReadability,
    );
    const BetterTextReadabilityProps = BetterTextReadability.props.children.props;

    BetterTextReadabilityProps.children = BetterTextReadabilityProps.children
      .toString()
      .replaceAll(ResolutionRegex, (orig) =>
        BetterReadability.resolution === "0" ? orig : `(${BetterReadability.resolution}p)`,
      );
  }
  return res;
});
