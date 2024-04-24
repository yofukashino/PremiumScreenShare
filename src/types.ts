import { types } from "replugged";
import type { Store as StoreType } from "replugged/dist/renderer/modules/common/flux";
import type Util from "replugged/dist/renderer/util";
export namespace Types {
  export import DefaultTypes = types;
  export type Store = StoreType;
  export type Tree = Util.Tree;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction> & {
    default: DefaultTypes.AnyFunction;
  };
  export interface GenericExport {
    exports?: GenericModule;
    id: string;
    loaded: boolean;
  }
  export interface WebRTCConnection {
    default: DefaultTypes.AnyFunction;
    BaseConnectionEvent: Record<string, string>;
  }
  export interface StreamingConstants {
    fps: number[];
    fpsWithPresets: number[];
    resolution: number[];
    resolutionWithPresets: number[];
  }
  export interface PartialProcessUtils {
    flushCookies: DefaultTypes.AnyFunction;
    flushDNSCache: DefaultTypes.AnyFunction;
    focus: DefaultTypes.AnyFunction;
    generateSessionFromPid: DefaultTypes.AnyFunction;
    getAudioPid: DefaultTypes.AnyFunction;
    getPidFromDesktopSource: DefaultTypes.AnyFunction;
    setApplicationBackgroundColor: DefaultTypes.AnyFunction;
    setZoomFactor: DefaultTypes.AnyFunction;
    submitLiveCrashReport: DefaultTypes.AnyFunction;
  }
  export interface StreamRTCConnectionStore extends Store {
    getActiveStreamKey: DefaultTypes.AnyFunction;
    getAllActiveStreamKeys: DefaultTypes.AnyFunction;
    getHostname: DefaultTypes.AnyFunction;
    getMaxViewers: DefaultTypes.AnyFunction;
    getMediaSessionId: DefaultTypes.AnyFunction;
    getQuality: DefaultTypes.AnyFunction;
    getRTCConnection: DefaultTypes.AnyFunction;
    getRegion: DefaultTypes.AnyFunction;
    getRtcConnectionId: DefaultTypes.AnyFunction;
    getStatsHistory: DefaultTypes.AnyFunction;
    getStreamSourceId: DefaultTypes.AnyFunction;
    getVideoStats: DefaultTypes.AnyFunction;
  }
  export interface ApplicationStreamingSettingsStore extends Store {
    getState: () => {
      preset: number;
      fps: number;
      resolution: number;
    };
  }
  export interface MediaEngineStore extends Store {
    getAecDump: DefaultTypes.AnyFunction;
    getAttenuateWhileSpeakingOthers: DefaultTypes.AnyFunction;
    getAttenuateWhileSpeakingSelf: DefaultTypes.AnyFunction;
    getAttenuation: DefaultTypes.AnyFunction;
    getAudioSubsystem: DefaultTypes.AnyFunction;
    getAutomaticGainControl: DefaultTypes.AnyFunction;
    getAv1Enabled: DefaultTypes.AnyFunction;
    getCameraComponent: DefaultTypes.AnyFunction;
    getDebugLogging: DefaultTypes.AnyFunction;
    getEchoCancellation: DefaultTypes.AnyFunction;
    getEnableSilenceWarning: DefaultTypes.AnyFunction;
    getEverSpeakingWhileMuted: DefaultTypes.AnyFunction;
    getExperimentalEncoders: DefaultTypes.AnyFunction;
    getExperimentalSoundshare: DefaultTypes.AnyFunction;
    getGoLiveContext: DefaultTypes.AnyFunction;
    getGoLiveSource: DefaultTypes.AnyFunction;
    getH265Enabled: DefaultTypes.AnyFunction;
    getHardwareClipEncode: DefaultTypes.AnyFunction;
    getHardwareH264: DefaultTypes.AnyFunction;
    getInputDetected: DefaultTypes.AnyFunction;
    getInputDeviceId: DefaultTypes.AnyFunction;
    getInputDevices: DefaultTypes.AnyFunction;
    getInputVolume: DefaultTypes.AnyFunction;
    getLocalPan: DefaultTypes.AnyFunction;
    getLocalVolume: DefaultTypes.AnyFunction;
    getLoopback: DefaultTypes.AnyFunction;
    getMediaEngine: () => VoiceEngine;
    getMode: DefaultTypes.AnyFunction;
    getModeOptions: DefaultTypes.AnyFunction;
    getNoInputDetectedNotice: DefaultTypes.AnyFunction;
    getNoiseCancellation: DefaultTypes.AnyFunction;
    getNoiseSuppression: DefaultTypes.AnyFunction;
    getOpenH264: DefaultTypes.AnyFunction;
    getOutputDeviceId: DefaultTypes.AnyFunction;
    getOutputDevices: DefaultTypes.AnyFunction;
    getOutputVolume: DefaultTypes.AnyFunction;
    getPacketDelay: DefaultTypes.AnyFunction;
    getQoS: DefaultTypes.AnyFunction;
    getSettings: DefaultTypes.AnyFunction;
    getShortcuts: DefaultTypes.AnyFunction;
    getSoundshareEnabled: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    getVideoComponent: DefaultTypes.AnyFunction;
    getVideoDeviceId: DefaultTypes.AnyFunction;
    getVideoDevices: DefaultTypes.AnyFunction;
    getVideoHook: DefaultTypes.AnyFunction;
    getVideoStreamParameters: DefaultTypes.AnyFunction;
    getVideoToggleState: DefaultTypes.AnyFunction;
    hasContext: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    isAdvancedVoiceActivitySupported: DefaultTypes.AnyFunction;
    isAecDumpSupported: DefaultTypes.AnyFunction;
    isAnyLocalVideoAutoDisabled: DefaultTypes.AnyFunction;
    isAutomaticGainControlSupported: DefaultTypes.AnyFunction;
    isDeaf: DefaultTypes.AnyFunction;
    isEnabled: DefaultTypes.AnyFunction;
    isExperimentalEncodersSupported: DefaultTypes.AnyFunction;
    isHardwareMute: DefaultTypes.AnyFunction;
    isInteractionRequired: DefaultTypes.AnyFunction;
    isLocalMute: DefaultTypes.AnyFunction;
    isLocalVideoAutoDisabled: DefaultTypes.AnyFunction;
    isLocalVideoDisabled: DefaultTypes.AnyFunction;
    isMediaFilterSettingLoading: DefaultTypes.AnyFunction;
    isMute: DefaultTypes.AnyFunction;
    isNativeAudioPermissionReady: DefaultTypes.AnyFunction;
    isNoiseCancellationError: DefaultTypes.AnyFunction;
    isNoiseCancellationSupported: DefaultTypes.AnyFunction;
    isNoiseSuppressionSupported: DefaultTypes.AnyFunction;
    isScreenSharing: DefaultTypes.AnyFunction;
    isSelfDeaf: DefaultTypes.AnyFunction;
    isSelfMute: DefaultTypes.AnyFunction;
    isSelfMutedTemporarily: DefaultTypes.AnyFunction;
    isSimulcastSupported: DefaultTypes.AnyFunction;
    isSoundSharing: DefaultTypes.AnyFunction;
    isSupported: DefaultTypes.AnyFunction;
    isVideoAvailable: DefaultTypes.AnyFunction;
    isVideoEnabled: DefaultTypes.AnyFunction;
    setCanHavePriority: DefaultTypes.AnyFunction;
    supports: DefaultTypes.AnyFunction;
    supportsDisableLocalVideo: DefaultTypes.AnyFunction;
    supportsEnableSoundshare: DefaultTypes.AnyFunction;
    supportsExperimentalSoundshare: DefaultTypes.AnyFunction;
    supportsInApp: DefaultTypes.AnyFunction;
  }
  export interface VoiceEngine {
    connections: Set<WebRTCConnection>;
    applyMediaFilterSettings: DefaultTypes.AnyFunction;
    connect: DefaultTypes.AnyFunction;
    connectionsEmpty: DefaultTypes.AnyFunction;
    createReplayConnection: DefaultTypes.AnyFunction;
    destroy: DefaultTypes.AnyFunction;
    eachConnection: DefaultTypes.AnyFunction;
    enable: DefaultTypes.AnyFunction;
    enableSoundshare: DefaultTypes.AnyFunction;
    exportClip: DefaultTypes.AnyFunction;
    getAudioInputDevices: DefaultTypes.AnyFunction;
    getAudioLayer: DefaultTypes.AnyFunction;
    getAudioOutputDevices: DefaultTypes.AnyFunction;
    getAudioSubsystem: DefaultTypes.AnyFunction;
    getCodecCapabilities: DefaultTypes.AnyFunction;
    getCodecSurvey: DefaultTypes.AnyFunction;
    getDebugLogging: DefaultTypes.AnyFunction;
    getDesktopSource: DefaultTypes.AnyFunction;
    getDesktopSources: DefaultTypes.AnyFunction;
    getLoopback: DefaultTypes.AnyFunction;
    getScreenPreviews: (
      width: number,
      height: number,
    ) => Array<{
      name: string;
      id: string;
    }>;
    getSoundshareStatus: DefaultTypes.AnyFunction;
    getSupportedVideoCodecs: DefaultTypes.AnyFunction;
    getVideoInputDevices: DefaultTypes.AnyFunction;
    getWindowPreviews: (
      width: number,
      height: number,
    ) => Array<{
      name: string;
      id: string;
    }>;
    interact: DefaultTypes.AnyFunction;
    rankRtcRegions: DefaultTypes.AnyFunction;
    saveClip: DefaultTypes.AnyFunction;
    setAecDump: DefaultTypes.AnyFunction;
    setAudioInputDevice: DefaultTypes.AnyFunction;
    setAudioOutputDevice: DefaultTypes.AnyFunction;
    setAudioSubsystem: DefaultTypes.AnyFunction;
    setAv1Enabled: DefaultTypes.AnyFunction;
    setClipBufferLength: DefaultTypes.AnyFunction;
    setDebugLogging: DefaultTypes.AnyFunction;
    setExperimentalAdm: DefaultTypes.AnyFunction;
    setGoLiveSource: DefaultTypes.AnyFunction;
    setH264Enabled: DefaultTypes.AnyFunction;
    setH265Enabled: DefaultTypes.AnyFunction;
    setHardwareClipEncode: DefaultTypes.AnyFunction;
    setInputVolume: DefaultTypes.AnyFunction;
    setLoopback: DefaultTypes.AnyFunction;
    setMaxSyncDelayOverride: DefaultTypes.AnyFunction;
    setOutputVolume: DefaultTypes.AnyFunction;
    setSoundshareSource: DefaultTypes.AnyFunction;
    setUseDirectVideo: DefaultTypes.AnyFunction;
    setVideoInputDevice: DefaultTypes.AnyFunction;
    shouldConnectionBroadcastVideo: DefaultTypes.AnyFunction;
    speedTester: DefaultTypes.AnyFunction;
    startAecDump: DefaultTypes.AnyFunction;
    startLocalAudioRecording: DefaultTypes.AnyFunction;
    stopAecDump: DefaultTypes.AnyFunction;
    stopLocalAudioRecording: DefaultTypes.AnyFunction;
    supported: DefaultTypes.AnyFunction;
    supports: DefaultTypes.AnyFunction;
    updateClipMetadata: DefaultTypes.AnyFunction;
    watchdogTick: DefaultTypes.AnyFunction;
    writeAudioDebugState: DefaultTypes.AnyFunction;
  }
  export interface StreamButtons {
    value: number;
    label: string | number;
  }
  export interface StreamPresets {
    resoliton: number;
    fps: number;
  }

  export interface ApplicationStreamingOption {
    ApplicationStreamFPS?: Record<string | number, string | number>;
    ApplicationStreamFPSButtons?: Array<{
      label: number;
      value: number;
    }>;
    ApplicationStreamFPSButtonsWithSuffixLabel?: Array<{
      label: string;
      value: number;
    }>;
    ApplicationStreamPresetValues?: {
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
    ApplicationStreamResolutionButtons?: Array<{
      label: number | string;
      value: number;
    }>;
    ApplicationStreamResolutionButtonsWithSuffixLabel?: Array<{
      label: string;
      value: number;
    }>;
    ApplicationStreamResolutions?: Record<string | number, string | number>;
    ApplicationStreamSettingRequirements?: Array<
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
    GoLiveDeviceResolutionButtons?: Array<{
      label: number;
      value: number;
    }>;
  }
  export interface WebRTCConnection {
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
      connection: WebRTCConnection;
      framerateReductionTimeout: number;
      handleSelfMute: DefaultTypes.AnyFunction;
      handleSpeaking: DefaultTypes.AnyFunction;
      sinkWants: VideoQualityManagerOrSinkWants;
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
    localMutes: Record<number, boolean>;
    localPans: Record<number, number>;
    localSpeakingFlags: Record<number, number>;
    localVideoSinkWants: {
      any: number;
    };
    localVolumes: Record<number, number>;
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
    goLiveSourceIdentifier: string | null;
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
    videoQualityManager: VideoQualityManagerOrSinkWants;
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
  export interface Ladder {
    budgetPortion: number;
    framerate: number;
    height: number;
    mutedFramerate: number;
    width: number;
  }
  export interface VideoQualityManagerOrSinkWants {
    connection: WebRTCConnection;
    contextType: string;
    isMuted: boolean;
    isStreamContext: boolean;
    ladder: {
      ladder: {
        0: Ladder;
        10: Ladder;
        20: Ladder;
        30: Ladder;
        40: Ladder;
        50: Ladder;
        60: Ladder;
        70: Ladder;
        80: Ladder;
        90: Ladder;
        100: Ladder;
        "-10": Ladder;
        "-20": Ladder;
        "-30": Ladder;
      };
      orderedLadder: Ladder[];
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
  export interface Modules {
    loadModules?: () => Promise<void>;
    StreamQualitySelectorPromise?: Promise<GenericModule>;
    StreamSettingsPromise?: Promise<GenericModule>;
    StreamUpsellPromise?: Promise<GenericModule>;
    VoiceConnection?: DefaultTypes.AnyFunction;
    PartialProcessUtils?: PartialProcessUtils;
    WebRTCConnection?: WebRTCConnection;
    VideoQualityManager?: DefaultTypes.AnyFunction;
    MediaEngineStore?: MediaEngineStore;
    ApplicationStreamingOptionStore?: ApplicationStreamingOption;
    StreamRTCConnectionStore?: StreamRTCConnectionStore;
    ApplicationStreamingSettingsStore?: ApplicationStreamingSettingsStore;
  }
  export type Jsonifiable =
    | null
    | undefined
    | boolean
    | number
    | string
    | Jsonifiable[]
    | { [key: string]: Jsonifiable };
  export type ValType<T> =
    | T
    | React.ChangeEvent<HTMLInputElement>
    | (Record<string, unknown> & { value?: T; checked?: T });

  export type NestedType<T, P> = P extends
    | `${infer Left}.${infer Right}`
    | `${infer Left}/${infer Right}`
    | `${infer Left}-${infer Right}`
    ? Left extends keyof T
      ? NestedType<T[Left], Right>
      : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? NestedType<Exclude<T[FieldKey], undefined> extends infer U ? U : never, IndexKey>
        : undefined
      : undefined
    : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer _IndexKey}]`
    ? FieldKey extends keyof T
      ? Exclude<T[FieldKey], undefined> extends infer U
        ? U
        : never
      : undefined
    : undefined;
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
    audioSource: string;
  }
}

export default Types;
