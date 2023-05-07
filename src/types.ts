export { types as DefaultTypes, components as ComponentTypes } from "replugged";
import { types as DefaultTypes } from "replugged";
import { ReactElement } from "react";
export { ReactElement, ComponentClass } from "react";
export interface Settings {
  fps: number[];
  resolution: number[];
  smoothVideo: {
    resolution: number;
    fps: number;
  };
  betterReadability: {
    resolution: number;
    fps: number;
  };
}
export interface ModalProps {
  children: ReactElement[];
  onClose: DefaultTypes.AnyFunction;
  size: string;
  transitionState: number;
}
export interface streamingConstants {
  fps: number[];
  fpsWithPresets: number[];
  resolution: number[];
  resolutionWithPresets: number[];
}
export interface TextTags {
  $$typeof: symbol;
  render: DefaultTypes.AnyFunction;
}
export interface ModalLayerClasses {
  backdrop: string;
  hidden: string;
  layer: string;
}
export interface TextArgs
  extends Array<{
    title: string;
    children: ReactElement;
  }> {}
export interface StreamButtons {
  value: number;
  label: string | number;
}
export interface StreamPresets {
  resoliton: number;
  fps: number;
}
export interface ApplicationStreamSettingRequirements {
  resolution: number;
  fps: number;
  guildPremiumTier?: number;
  quality?: string;
}
export interface ApplicationStreamingOption {
  ApplicationStreamFPS: {
    [key: string | number]: string | number;
  };
  ApplicationStreamFPSButtons: Array<{
    label: number;
    value: number;
  }>;
  ApplicationStreamFPSButtonsWithSuffixLabel: Array<{
    label: string;
    value: number;
  }>;
  ApplicationStreamPresetValues: {
    1: Array<{
      fps: number;
      resolution: number;
    }>;
    2: Array<{
      fps: number;
      resolution: number;
    }>;
    3: unknown[];
  };
  ApplicationStreamResolutionButtons: Array<{
    label: number | string;
    value: number;
  }>;
  ApplicationStreamResolutionButtonsWithSuffixLabel: Array<{
    label: string;
    value: number;
  }>;
  ApplicationStreamResolutions: {
    [key: string | number]: string | number;
  };
  ApplicationStreamSettingRequirements: Array<
    FlatArray<
      Array<{ resolution: number; fps: number; guildPremiumTier?: number; quality?: string }>,
      | 0
      | 1
      | 2
      | 3
      | 16
      | 9
      | -1
      | 4
      | 5
      | 6
      | 7
      | 8
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 17
      | 18
      | 19
      | 20
    >
  >;
}
export interface WebRTCUtils {
  activeOutputSinks: object;
  attenuateWhileSpeakingOthers: boolean;
  attenuateWhileSpeakingSelf: boolean;
  attenuationFactor: number;
  audioSSRC: number;
  automaticGainControl: boolean;
  codecs: Array<{
    decode?: boolean;
    encode?: boolean;
    name: string;
    payloadType: number;
    priority: number;
    rtxPayloadType?: number;
    type: string;
  }>;
  conn: {
    clearDesktopSource: DefaultTypes.AnyFunction;
    configureConnectionRetries: DefaultTypes.AnyFunction;
    destroy: DefaultTypes.AnyFunction;
    destroyUser: DefaultTypes.AnyFunction;
    getEncryptionModes: DefaultTypes.AnyFunction;
    getFilteredStats: DefaultTypes.AnyFunction;
    getStats: DefaultTypes.AnyFunction;
    mergeUsers: DefaultTypes.AnyFunction;
    setDesktopSource: DefaultTypes.AnyFunction;
    setDesktopSourceStatusCallback: DefaultTypes.AnyFunction;
    setDesktopSourceWithOptions: DefaultTypes.AnyFunction;
    setDisableLocalVideo: DefaultTypes.AnyFunction;
    setLocalMute: DefaultTypes.AnyFunction;
    setLocalPan: DefaultTypes.AnyFunction;
    setLocalVolume: DefaultTypes.AnyFunction;
    setMinimumOutputDelay: DefaultTypes.AnyFunction;
    setOnDesktopSourceEnded: DefaultTypes.AnyFunction;
    setOnSoundshare: DefaultTypes.AnyFunction;
    setOnSoundshareEnded: DefaultTypes.AnyFunction;
    setOnSoundshareFailed: DefaultTypes.AnyFunction;
    setOnSpeakingCallback: DefaultTypes.AnyFunction;
    setOnSpeakingWhileMutedCallback: DefaultTypes.AnyFunction;
    setOnVideoCallback: DefaultTypes.AnyFunction;
    setPTTActive: DefaultTypes.AnyFunction;
    setPingCallback: DefaultTypes.AnyFunction;
    setPingInterval: DefaultTypes.AnyFunction;
    setPingTimeoutCallback: DefaultTypes.AnyFunction;
    setRemoteUserCanHavePriority: DefaultTypes.AnyFunction;
    setRemoteUserSpeakingStatus: DefaultTypes.AnyFunction;
    setRtcLogMarker: DefaultTypes.AnyFunction;
    setSelfDeafen: DefaultTypes.AnyFunction;
    setSelfMute: DefaultTypes.AnyFunction;
    setTransportOptions: DefaultTypes.AnyFunction;
    setVideoBroadcast: DefaultTypes.AnyFunction;
    startReplay: DefaultTypes.AnyFunction;
    startSamplesLocalPlayback: DefaultTypes.AnyFunction;
    startSamplesPlayback: DefaultTypes.AnyFunction;
    stopAllSamplesLocalPlayback: DefaultTypes.AnyFunction;
    stopSamplesLocalPlayback: DefaultTypes.AnyFunction;
    stopSamplesPlayback: DefaultTypes.AnyFunction;
  };
  connectionState: string;
  context: string;
  desktopDegradationPreference: number;
  destroyed: boolean;
  disabledLocalVideos: object;
  echoCancellation: boolean;
  emitter: {
    _events: {
      "active-sinks-change": DefaultTypes.AnyFunction;
      connected: DefaultTypes.AnyFunction[];
      connectionstatechange: DefaultTypes.AnyFunction;
      desktopsourceend: DefaultTypes.AnyFunction;
      destroy: DefaultTypes.AnyFunction[];
      error: DefaultTypes.AnyFunction;
      interactionrequired: DefaultTypes.AnyFunction;
      "local-mute": DefaultTypes.AnyFunction;
      "local-video-disabled": DefaultTypes.AnyFunction[];
      mute: DefaultTypes.AnyFunction;
      newListener: DefaultTypes.AnyFunction;
      noisecancellererror: DefaultTypes.AnyFunction;
      outboundlossrate: DefaultTypes.AnyFunction;
      ping: DefaultTypes.AnyFunction;
      pingtimeout: DefaultTypes.AnyFunction;
      "screenshare-finish": DefaultTypes.AnyFunction;
      silence: DefaultTypes.AnyFunction[];
      soundshareattached: DefaultTypes.AnyFunction;
      soundsharefailed: DefaultTypes.AnyFunction;
      soundsharespeaking: DefaultTypes.AnyFunction;
      soundsharetracee: DefaultTypes.AnyFunction[];
      speakinge: DefaultTypes.AnyFunction[];
      speakingwhilemuted: DefaultTypes.AnyFunction;
      stats: DefaultTypes.AnyFunction[];
      video: DefaultTypes.AnyFunction;
      "video-state": DefaultTypes.AnyFunction;
      "videohook-initialize": DefaultTypes.AnyFunction;
      voiceactivitydetectorerror: DefaultTypes.AnyFunction;
    };
    _eventsCount: number;
    _maxListeners: number | boolean;
  };
  experimentFlags: Set<string>;
  experimentalEncoders: boolean;
  forceAudioNormal: boolean;
  forceAudioPriority: boolean;
  framerateReducer: {
    connection: WebRTCUtils;
    framerateReductionTimeout: number;
    handleSelfMute: DefaultTypes.AnyFunction;
    handleSpeaking: DefaultTypes.AnyFunction;
    sinkWants: videoQualityManagerOrSinkWants;
  };
  handleDesktopSourceEnded: DefaultTypes.AnyFunction;
  handleNewListenerNative: DefaultTypes.AnyFunction;
  handleNoInput: DefaultTypes.AnyFunction;
  handlePing: DefaultTypes.AnyFunction;
  handlePingTimeout: DefaultTypes.AnyFunction;
  handleSoundshare: DefaultTypes.AnyFunction;
  handleSoundshareEnded: DefaultTypes.AnyFunction;
  handleSoundshareFailed: DefaultTypes.AnyFunction;
  handleSpeakingFlags: DefaultTypes.AnyFunction;
  handleSpeakingNative: DefaultTypes.AnyFunction;
  handleSpeakingWhileMuted: DefaultTypes.AnyFunction;
  handleStats: DefaultTypes.AnyFunction;
  handleVideo: DefaultTypes.AnyFunction;
  hardwareH264: boolean;
  ids: {
    channelId: string;
    guildId: string;
    userId: string;
  };
  inputMode: string;
  isActiveOutputSinksEnabled: boolean;
  keyframeInterval: number;
  localMutes: {
    [key: number]: boolean;
  };
  localPans: {
    [key: number]: number;
  };
  localSpeakingFlags: {
    [key: number]: number;
  };
  localVideoSinkWants: {
    any: number;
  };
  localVolumes: {
    [key: number]: number;
  };
  mediaEngineConnectionId: string;
  minimumJitterBufferLevel: number;
  noiseCancellation: boolean;
  noiseSuppression: boolean;
  postponeDecodeLevel: number;
  pttReleaseDelay: number;
  qos: boolean;
  reconnectInterval: number;
  remoteAudioSSRCs: object;
  remoteSinkWantsMaxFramerate: number;
  remoteVideoSSRCs: object;
  remoteVideoSinkWants: { any: number };
  selfDeaf: boolean;
  selfMute: boolean;
  selfVideo: boolean;
  soundshareActive: boolean;
  soundshareId: boolean | number;
  soundshareSentSpeakingEvent: boolean;
  sourceDesktopDegradationPreference: number;
  stats: {
    camera?: boolean;
    mediaEngineConnectionId: string;
    rtp: {
      inbound: object;
      outbound: Array<{
        audioDetected: number;
        audioLevel: number;
        bytesSent: number;
        codec: { id: number; name: string };
        fractionLost: number;
        framesCaptured: number;
        framesRendered: number;
        noiseCancellerProcessTime: number | undefined;
        packetsLost: number;
        packetsSent: number;
        sinkWant: string;
        ssrc: number;
        type: string;
        voiceActivityDetectorProcessTime?: number | undefined;
      }>;
    };
    screenshare: undefined | boolean;
    transport: {
      availableOutgoingBitrate: number;
      bytesSent: number;
      decryptionFailures: number;
      inboundBitrateEstimate: number;
      localAddress: string;
      outboundBitrateEstimate: number;
      pacerDelay: number;
      ping: number;
      receiverBitrateEstimate: number;
      receiverReports: object[];
      routingFailures: number;
    };
  };
  streamUserId?: number | undefined;
  useElectronVideo: boolean;
  vadAutoThreshold: boolean;
  vadLeading: number;
  vadThreshold: number;
  vadTrailing: number;
  vadUseKrisp: boolean;
  videoDegradationPreference: number;
  videoQualityManager: videoQualityManagerOrSinkWants;
  videoReady: boolean;
  videoStreamParameters: Array<{
    active: boolean;
    maxBitrate: number;
    maxFrameRate: number;
    maxPixelCount: number;
    maxResolution: { type: string; width: number; height: number };
    profile: undefined | string;
    quality: number;
    rid: string;
    rtxSsrc: number;
    ssrc: number;
    type: string;
  }>;
  videoSupported: boolean;
  voiceBitrate: number;
  wantsPriority: Set<number>;
}
export interface ladder {
  budgetPortion: number;
  framerate: number;
  height: number;
  mutedFramerate: number;
  width: number;
}
export interface videoQualityManagerOrSinkWants {
  connection: WebRTCUtils;
  contextType: string;
  isMuted: boolean;
  isStreamContext: boolean;
  ladder: {
    ladder: {
      0: ladder;
      10: ladder;
      20: ladder;
      30: ladder;
      40: ladder;
      50: ladder;
      60: ladder;
      70: ladder;
      80: ladder;
      90: ladder;
      100: ladder;
      "-10": ladder;
      "-20": ladder;
      "-30": ladder;
    };
    orderedLadder: ladder[];
  };
  options: {
    desktopBitrate: { min: number; max: number; target: number };
    videoBitrate: { min: number; max: number };
    videoBitrateFloor: number;
    videoBudget: { width: number; height: number; framerate: number };
    videoCapture: { width: number; height: number; framerate: number };
  };
  qualityOverwrite: {
    qualityOverwrite?: boolean;
    bitrateMax?: boolean;
    bitrateMin?: boolean;
    bitrateTarget?: boolean;
    capture?: boolean;
    encode?: boolean;
  };
  applyQualityConstraints: DefaultTypes.AnyFunction;
  getDesktopQuality: DefaultTypes.AnyFunction;
  getQuality: DefaultTypes.AnyFunction;
  getVideoQuality: DefaultTypes.AnyFunction;
  setQuality: DefaultTypes.AnyFunction;
  constructor: DefaultTypes.AnyFunction;
}
