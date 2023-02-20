import { webpack } from "replugged";
import * as Types from "../types";
export const ApplicationStreamingOptionStore = webpack.getBySource("Unknown resolution: ");
export const WebRTCUtilsModule = webpack.getBySource(
  '"WebRTC-"',
) as unknown as Types.DefaultTypes.ObjectExports;
export const WebRTCUtils = webpack.getFunctionBySource(WebRTCUtilsModule, '"WebRTC-"');

const TextTagsString =
  '"children","disabled","className","titleClassName","tag","required","style","title","error"';
export const TextTagsModule = webpack.getBySource(
  TextTagsString,
) as unknown as Types.DefaultTypes.ObjectExports;
export const TextTags = Object.values(TextTagsModule).find((m: Types.TextTags) =>
  m?.render?.toString().includes(TextTagsString),
);
export const ModalClasses = webpack.getByProps("fullscreenOnMobile", "large", "root");
