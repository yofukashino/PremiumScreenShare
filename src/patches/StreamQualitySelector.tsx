import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import { StreamQualitySelectorPromise } from "../lib/requiredModules";
import AudioSourcePicker from "../Components/AudioSourcePicker";
import Utils from "../lib/utils";
import Types from "../types";

export default async (): Promise<void> => {
  const StreamQualitySelector = await StreamQualitySelectorPromise;
  PluginInjector.after(
    StreamQualitySelector,
    "default",
    (_args, res: React.ReactElement & Types.Tree) => {
      if (res?.props?.children) {
        res.props.children = Array.isArray(res.props.children)
          ? res.props.children
          : [res.props.children];
        if (!res.props.children.some((c) => c?.type?.toString()?.includes("audioSource")))
          res.props.children.unshift(<AudioSourcePicker />);
      }
      const BetterTextReadability = Utils.findInReactTree(
        res,
        (c: React.ReactElement & Types.Tree) =>
          typeof c?.props?.title === "string" &&
          typeof c?.props?.children?.props?.children === "string",
      ) as React.ReactElement & Types.Tree;

      if (BetterTextReadability) {
        const OriginalString = BetterTextReadability.props.children.props.children.match(
          // eslint-disable-next-line no-misleading-character-class
          /[\u0028\uFF08\u207D\u208D\u2768\u276A\u276B\u2E28\uFE59\uFF5F]+(?!FPS)[a-zA-ZÀ-ÖØ-öø-ÿĀ-žА-яЁёԱ-֏ऀ-৿਀-૿଀-୿஀-௿ఀ-೿ഀ-ൿ඀-෿ก-๿຀-຿က-ဿ၀-ၿჀ-ჿḀ-῿\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]+[\u0029\uFF09\u207E\u208E\u2769\u276B\u276C\u2E29\uFE5A\uFF60]+/g,
        )?.[0];

        if (OriginalString) {
          BetterTextReadability.props.children.props.children =
            BetterTextReadability.props.children.props.children.replace(
              OriginalString,
              SettingValues.get("betterReadability", defaultSettings.betterReadability)
                .resolution === "0"
                ? OriginalString
                : `(${
                    SettingValues.get("betterReadability", defaultSettings.betterReadability)
                      .resolution
                  }p)`,
            );
        }
      }
      return res;
    },
  );
};
