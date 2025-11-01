import { webpack } from "replugged";
import type Types from "@Types";

export interface RTCConnection {
  goLiveSourceIdentifier: string;
}

export interface MediaEngine {
  connections: Set<RTCConnection>;
  getScreenPreviews: (
    width: number,
    height: number,
  ) => Array<{
    name: string;
    id: string;
  }>;
  getWindowPreviews: (
    width: number,
    height: number,
  ) => Array<{
    name: string;
    id: string;
  }>;
  soundshareId: number;
  setSoundshareSource: (pid: number, hook: boolean) => void;
  handleSoundshareFailed: () => void;
}

export interface MediaEngineStore extends Types.Store {
  getMediaEngine: () => MediaEngine;
}

export default await webpack
  .waitForStore<MediaEngineStore>("MediaEngineStore", {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find MediaEngineStore");
  });
