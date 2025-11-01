import { webpack } from "replugged";

export declare class WebRTCConnection {
  public applyVideoQualityMode: () => void;
  public updateVideoQuality: () => unknown;
}

export default await webpack
  .waitForPrototype<WebRTCConnection>(["updateVideoQuality", "applyVideoQualityMode"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find WebRTCConnection  Module");
  });
