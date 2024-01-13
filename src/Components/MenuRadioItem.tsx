import { util } from "replugged";
import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "../index";
import { MediaEngineStore, PartialProcessUtils } from "../lib/requiredModules";
import { defaultSettings } from "../lib/consts";
export default (): React.ReactElement => {
  const MediaEngine = MediaEngineStore.getMediaEngine();
  const [isStreamScreen, setStreamTypeStatus] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<Array<{ label: string; id: string }>>([]);
  const [audioSource, setAudioSource] = util.useSettingArray(
    SettingValues,
    "audioSource",
    defaultSettings.audioSource,
  );
  const findAndSetStreamSource = () => {
    const connectionArray = Array.from(MediaEngine?.connections ?? []);
    const streamConnection = connectionArray?.find((c) => c?.goLiveSourceIdentifier);
    setStreamTypeStatus(
      (streamConnection?.goLiveSourceIdentifier as string).includes("screen-handle:"),
    );
  };
  const getPreviewAndSetOptions = async () => {
    const windowPreviews = await MediaEngine.getWindowPreviews(1, 1);
    const screenPreviews = (await MediaEngine.getScreenPreviews(1, 1)) as [];
    const previewOptions = [...windowPreviews, ...screenPreviews].map((p) => ({
      label: p.name,
      id: p.id,
    }));
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
      setAudioSource("none");
    }
  }, [JSON.stringify(options)]);
  React.useEffect(() => {
    if (audioSource) {
      const pid = PartialProcessUtils.getPidFromDesktopSource(audioSource);
      MediaEngine?.setSoundshareSource(pid, true);
    }
  }, [audioSource]);
  return (
    MediaEngine &&
    isStreamScreen && (
      <ContextMenu.MenuItem
        {...{
          label: "Audio Source",
          id: "audio-source",
        }}>
        {options.map((o) => (
          <ContextMenu.MenuRadioItem
            {...{
              ...o,
              checked: o.id === audioSource,
              action: () => {
                setAudioSource(o.id);
              },
            }}
          />
        ))}
      </ContextMenu.MenuItem>
    )
  );
};
