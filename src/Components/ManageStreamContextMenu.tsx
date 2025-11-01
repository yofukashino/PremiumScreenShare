import { util } from "replugged";
import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "../index";
import { DefaultSettings, SoundshareSupported } from "@consts";
import { MediaEngineStore, NativeSources } from "@lib/RequiredModules";
import Utils from "@Utils";
import Types from "@Types";

export default (_data, menu): React.ReactElement => {
  const MediaEngine = MediaEngineStore?.getMediaEngine();
  const [isStreamScreen, setIsStreamScreen] = React.useState<boolean>(false);

  const [options, setOptions] = React.useState<Array<{ label: string; id: string }>>([]);

  const [audioSource, setAudioSource] = util.useSettingArray(
    SettingValues,
    "audioSource",
    DefaultSettings.audioSource,
  );

  const getStreamType = (): void => {
    const connectionArray = Array.from(MediaEngine?.connections ?? []);
    const streamConnection = connectionArray?.find((c) => c?.goLiveSourceIdentifier);

    setIsStreamScreen(streamConnection?.goLiveSourceIdentifier?.startsWith("screen"));
  };

  const getPreviewAndSetOptions = async (): Promise<void> => {
    if (!MediaEngine || !SoundshareSupported) return;

    const ScreenSources = await NativeSources.get(MediaEngine, ["window", "screen"], {
      width: 1,
      height: 1,
    });

    const PreviewOptions = ScreenSources.map((p) => ({
      label: p.name,
      id: p.id,
    }));
    setOptions(() => [
      {
        label: "None",
        id: "none",
      },
      ...PreviewOptions,
    ]);
  };
  React.useEffect(() => {
    getStreamType();
    void getPreviewAndSetOptions();
    const checkInterval = setInterval(getPreviewAndSetOptions, 3000);
    return () => clearInterval(checkInterval);
  }, []);

  React.useEffect(() => {
    const noOptions = options.length && !options.some((o) => o.id === audioSource);
    if (!audioSource || noOptions) {
      setAudioSource("none");
    }
  }, [options]);

  React.useEffect(() => {
    if (audioSource) {
      const pid = Utils.getPidFromSourceId(audioSource);
      MediaEngine?.setSoundshareSource(pid, true);
    }
  }, [audioSource]);

  const ItemGroup =
    isStreamScreen &&
    (util.findInReactTree(menu as Types.ReactTree, (i: Types.ReactTree) =>
      i?.props?.children?.some?.((c) => c?.props?.id === "stream-settings-audio-enable"),
    ) as Types.ReactTree);
  if (ItemGroup)
    ItemGroup.props.children = ItemGroup.props.children.filter(
      (c) => c?.props?.id !== "stream-settings-audio-enable",
    );

  if (!MediaEngine || !SoundshareSupported || !isStreamScreen) return null;

  return (
    <ContextMenu.MenuItem label="Audio Source" id="audio-source">
      {options.map(({ id, label }) => (
        <ContextMenu.MenuRadioItem
          key={id}
          id={id}
          label={label}
          checked={id === audioSource}
          action={() => {
            setAudioSource(id);
          }}
        />
      ))}
    </ContextMenu.MenuItem>
  );
};
