import { util } from "replugged";
import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "../index";
import { MediaEngineStore, PartialProcessUtils } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
export default (): React.ReactElement => {
  const VoiceEngine = MediaEngineStore.getMediaEngine();
  const [isStreamScreen, setStreamTypeStatus] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<Array<{ label: string; id: string }>>([]);
  const [audioSource, setAudioSource] = util.useSettingArray(
    SettingValues,
    "audioSource",
    defaultSettings.audioSource,
  );
  const findAndSetStreamSource = () => {
    const connectionArray = Array.from(VoiceEngine?.connections ?? []);
    const streamConnection = connectionArray?.find((c) => c?.goLiveSourceIdentifier);
    setStreamTypeStatus(
      (streamConnection?.goLiveSourceIdentifier as string).includes("screen-handle:"),
    );
  };
  const getPreviewAndSetOptions = async () => {
    const previews = await VoiceEngine?.getWindowPreviews(1, 1);
    const previewOptions = previews?.map((p) => ({ label: p.name, id: p.id }));
    setOptions(() => [
      {
        label: "None",
        id: "none",
      },
      ...previewOptions,
    ]);
  };
  React.useEffect(() => {
    findAndSetStreamSource();
    getPreviewAndSetOptions();
    const checkInterval = setInterval(getPreviewAndSetOptions, 3000);
    return () => clearInterval(checkInterval);
  }, []);
  React.useEffect(() => {
    if (!audioSource || (options.length && !options.some((o) => o.id === audioSource))) {
      setAudioSource("default");
    }
  }, [JSON.stringify(options)]);
  React.useEffect(() => {
    if (audioSource) {
      const pid = PartialProcessUtils.getPidFromDesktopSource(audioSource);
      VoiceEngine?.setSoundshareSource(pid, true);
    }
  }, [audioSource]);
  return (
    VoiceEngine && (
      <ContextMenu.MenuItem
        {...{
          label: "Audio Source",
          id: "audio-source",
        }}>
        {isStreamScreen ? (
          options.map((o) => (
            <ContextMenu.MenuRadioItem
              {...{
                ...o,
                checked: o.id === audioSource,
                action: () => {
                  setAudioSource(o.id);
                },
              }}
            />
          ))
        ) : (
          <ContextMenu.MenuItem
            {...{
              label: "Not Supported",
              subtext: "Stream Screen to select audio source",
              id: "audio-source-unsupported",
            }}
          />
        )}
      </ContextMenu.MenuItem>
    )
  );
};
