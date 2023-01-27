import { webpack } from "replugged";
export const ApplicationStreamingOptionStore = webpack.getBySource("Unknown resolution: ");
export const { Z: WebRTCUtils } = webpack.getModule((m) =>
  m?.exports?.Z?.toString()?.includes("WebRTC"),
);
export const { xJ: TextTags } = webpack.getModule((m) =>
  m?.exports?.xJ?.render?.toString().includes(".titleId"),
);
