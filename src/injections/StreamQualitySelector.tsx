import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import AudioSourcePicker from "../Components/AudioSourcePicker";
import HDRCaptureSwitch from "../Components/HDRCaptureSwitch";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamQualitySelector = await Modules.StreamQualitySelectorPromise;
  const loader = webpack.getFunctionKeyBySource(
    StreamQualitySelector,
    "StreamSettings: user cannot be undefined",
  );
  PluginInjector.after(
    StreamQualitySelector,
    loader,
    ([{ isScreen } = { isScreen: false }], res: React.ReactElement & Types.Tree) => {
      if (res?.props?.children) {
        res.props.children = Array.isArray(res.props.children)
          ? res.props.children
          : [res.props.children];
        if (
          !res.props.children.some((c) => c?.type?.toString()?.includes("audioSource")) &&
          isScreen
        )
          res.props.children.unshift(<AudioSourcePicker />);
        if (!res.props.children.some((c) => c?.type?.toString()?.includes("hdrCaptureMode")))
          res.props.children.unshift(<HDRCaptureSwitch />);
      }
      const BetterTextReadability = Utils.findInReactTree(
        res,
        (c: React.ReactElement & Types.Tree) =>
          typeof c?.props?.title === "string" &&
          typeof c?.props?.children?.props?.children === "string",
      ) as React.ReactElement & Types.Tree;

      if (BetterTextReadability) {
        BetterTextReadability.props.children.props.children =
          BetterTextReadability.props.children.props.children.replaceAll(
            /[\u0028\uFF08\u207D\u208D\u2768\u276A\u276B\u2E28\uFE59\uFF5F]+(?!FPS)[a-zA-ZÀ-ÖØ-öø-ÿĀ-žА-яЁёԱ-֏ऀ-৿਀-૿଀-୿஀-௿ఀ-೿ഀ-ൿ඀-෿ก-๿຀-຿က-ဿ၀-ၿჀ-ჿḀ-῿\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]+[\u0029\uFF09\u207E\u208E\u2769\u276B\u276C\u2E29\uFE5A\uFF60]+/g,
            (orig) =>
              SettingValues.get("betterReadability", defaultSettings.betterReadability)
                .resolution === "0"
                ? orig
                : `(${
                    SettingValues.get("betterReadability", defaultSettings.betterReadability)
                      .resolution
                  }p)`,
          );
      }
      return res;
    },
  );
};
