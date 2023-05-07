import { PluginInjector, SettingValues } from "../index";

import { defaultSettings } from "../lib/consts";

import { TextTags } from "../lib/requiredModules";

import * as Types from "../types";

export const patchBetterReadablityText = (): void => {
  PluginInjector.before(TextTags, "render", ([args]: Types.TextArgs) => {
    if (args?.title !== "Resolution" || !args?.children?.props?.children) return;
    const {
      children: { props },
    } = args;
    if (props?.children)
      props.children = props.children.replace(
        "(Source)",
        `(${
          SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution ==
          "0"
            ? "Source"
            : `${
                SettingValues.get("betterReadability", defaultSettings.betterReadability).resolution
              }P`
        })`,
      );
  });
};
