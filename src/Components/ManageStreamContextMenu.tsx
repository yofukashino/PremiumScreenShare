import { util } from "replugged";
import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings, soundshareSupported } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (_data, menu: Types.Menu): React.ReactElement => {
  const { MediaEngineStore } = Modules;
  const MediaEngine = MediaEngineStore?.getMediaEngine();
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
    setStreamTypeStatus(streamConnection?.goLiveSourceIdentifier?.startsWith("screen"));
  };
  const getPreviewAndSetOptions = async () => {
    if (!soundshareSupported) return;
    const ScreenSources = (await Modules.getNativeSources(MediaEngine, ["window", "screen"], {
      width: 1,
      height: 1,
    })) as Array<{
      name: string;
      id: string;
      url: string;
    }>;
    const previewOptions = ScreenSources.map((p) => ({
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
      const pid = Utils.getPidFromSourceId(audioSource);
      MediaEngine?.setSoundshareSource(pid, true);
    }
  }, [audioSource]);

  const ItemGroup =
    isStreamScreen &&
    (Utils.findInReactTree(menu, (i: Types.Tree) =>
      i?.props?.children?.some?.((c) => c?.props?.id === "stream-settings-audio-enable"),
    ) as Types.Tree);
  if (ItemGroup)
    ItemGroup.props.children = ItemGroup.props.children.filter(
      (c) => c?.props?.id !== "stream-settings-audio-enable",
    );

  return (
    soundshareSupported &&
    MediaEngine &&
    isStreamScreen && (
      <ContextMenu.MenuItem label="Audio Source" id="audio-source">
        {options.map(({ id, label }) => (
          <ContextMenu.MenuRadioItem
            id={id}
            label={label}
            checked={id === audioSource}
            action={() => {
              setAudioSource(id);
            }}
          />
        ))}
      </ContextMenu.MenuItem>
    )
  );
};
