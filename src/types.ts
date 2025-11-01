import { types } from "replugged";
import type * as flux from "replugged/dist/renderer/modules/common/flux";
import type util from "replugged/dist/renderer/util";

import type { PartialApplicationStreamingOption } from "@lib/RequiredModules/ApplicationStreamingOption";
import type { MediaEngineStore } from "@lib/RequiredModules/MediaEngineStore";
import type { NativeSources } from "@lib/RequiredModules/NativeSources";
import type { StreamQualitySelector } from "@lib/RequiredModules/StreamQualitySelector";
import type { StreamSettingContext } from "@lib/RequiredModules/StreamSettingContext";
import type { StreamSettings } from "@lib/RequiredModules/StreamSettings";
import type { StreamUpsell } from "@lib/RequiredModules/StreamUpsell";
import type { VoiceConnection } from "@lib/RequiredModules/VoiceConnection";
import type { WebRTCConnection } from "@lib/RequiredModules/WebRTCConnection";
import type { StreamQualityType } from "@lib/RequiredModules/StreamQualityType";

export namespace Types {
  export import DefaultTypes = types;
  export type Store = flux.Store;
  export type ReactTree = util.Tree & React.ReactElement;

  export interface StreamingConstants {
    fps: number[];
    fpsWithPresets: number[];
    resolution: number[];
    resolutionWithPresets: number[];
  }

  export interface DiscordUtils {
    getPidFromWindowHandle: (handle: string) => number;
  }

  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    ApplicationStreamingOption?: PartialApplicationStreamingOption;
    StreamQualitySelector?: StreamQualitySelector["exports"];
    StreamSettings?: StreamSettings;
    StreamUpsell?: StreamUpsell;
    VoiceConnection?: VoiceConnection & { prototype: VoiceConnection };
    WebRTCConnection?: WebRTCConnection & { prototype: WebRTCConnection };
    StreamQualityType?: StreamQualityType["exports"];
    StreamSettingContext?: StreamSettingContext;
    NativeSources?: NativeSources;
    MediaEngineStore?: MediaEngineStore;
  }
}

export default Types;

declare global {
  export const DiscordNative: {
    features: {
      supports: (feature: string) => boolean;
    };
    nativeModules: {
      requireModule: (module: "discord_utils") => Types.DiscordUtils;
    };
  };
}
