import { webpack } from "replugged";

export declare class VoiceConnection {
  public clearAllSpeaking: () => void;
  public setGoLiveSource: (source: {
    desktopDescription: { soundshareId: number; id?: string; hdrCaptureMode?: string };
  }) => void;
}

export default await webpack
  .waitForPrototype<VoiceConnection>(["clearAllSpeaking", "setGoLiveSource"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find VoiceConnection  Module");
  });
