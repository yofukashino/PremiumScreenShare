import { webpack } from "replugged";
import * as Utils from "../lib/utils";
import * as Types from "../types";
export const ApplicationStreamingOptionStore = webpack.getBySource("Unknown resolution: ");
export const WebRTCUtilsModule = webpack.getModule((m) =>
  Utils.prototypeFilter(m?.exports, ["updateVideoQuality", "setUseElectronVideo"]),
) as unknown as Types.DefaultTypes.ObjectExports;
export const WebRTCUtils = Utils.prototypeFilter(
  WebRTCUtilsModule,
  ["updateVideoQuality", "setUseElectronVideo"],
  true,
) as Types.DefaultTypes.AnyFunction;
const TextTagsString =
  '"children","disabled","className","titleClassName","tag","required","style","title","error"';
export const TextTagsModule = webpack.getBySource(
  TextTagsString,
) as unknown as Types.DefaultTypes.ObjectExports;
export const TextTags = Object.values(TextTagsModule).find((m: Types.TextTags) =>
  m?.render?.toString().includes(TextTagsString),
) as Types.TextTags;
export const ModalLayerClasses = webpack.getByProps([
  "backdrop",
  "hidden",
  "layer",
]) as unknown as Types.ModalLayerClasses;
