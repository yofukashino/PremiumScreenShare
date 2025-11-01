import { util } from "replugged";
import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings, SoundshareSupported } from "@consts";
import { MediaEngineStore, NativeSources, StreamSettingContext } from "@lib/RequiredModules";

export default (): React.ReactElement => {
  const MediaEngine = MediaEngineStore?.getMediaEngine();

  const [options, setOptions] = React.useState<Array<{ label: string; id: string }>>([]);
  const [audioSource, setAudioSource] = util.useSettingArray(
    SettingValues,
    "audioSource",
    DefaultSettings.audioSource,
  );

  const isScreen = React.useMemo(() => {
    const [{ sourceType }] = StreamSettingContext.use?.() ?? [{ sourceType: "" }];
    return sourceType === "screen";
  }, [StreamSettingContext.use]);

  const getPreviewAndSetOptions = async () => {
    if (!MediaEngine || !SoundshareSupported || !isScreen) return;
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
    getPreviewAndSetOptions();
    const checkInterval = setInterval(getPreviewAndSetOptions, 3000);
    return () => clearInterval(checkInterval);
  }, []);

  React.useEffect(() => {
    const noOptions = options.length && !options.some((o) => o.id === audioSource);
    if (!audioSource || noOptions) {
      setAudioSource("none");
    }
  }, [options]);

  if (!MediaEngine || !SoundshareSupported || !isScreen) return null;

  return (
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
  );
};
