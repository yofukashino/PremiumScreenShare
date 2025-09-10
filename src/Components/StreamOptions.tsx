import { React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings, soundshareSupported } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";

export default (): React.ReactElement => {
  const { getStreamSettingContextPromise, getNativeSources, MediaEngineStore } = Modules;
  const MediaEngine = MediaEngineStore?.getMediaEngine();
  if (!MediaEngine || !soundshareSupported) return null;
  const [options, setOptions] = React.useState<Array<{ label: string; id: string }>>([]);
  const [audioSource, setAudioSource] = Utils.useSettingArray(
    SettingValues,
    "audioSource",
    defaultSettings.audioSource,
  );
  const getStreamSettingContext = React.useRef(() => [{ sourceType: "null" }]);
  const isScreen = React.useMemo(() => {
    const [{ sourceType }] = getStreamSettingContext.current();
    return sourceType === "screen";
  }, [getStreamSettingContext.current]);

  const getPreviewAndSetOptions = async () => {
    const ScreenSources = (await getNativeSources(MediaEngine, ["window", "screen"], {
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
    getStreamSettingContextPromise.then((c) => {
      getStreamSettingContext.current = c as () => Array<{ sourceType: string }>;
    });
    getPreviewAndSetOptions();
    const checkInterval = setInterval(getPreviewAndSetOptions, 3000);
    return () => clearInterval(checkInterval);
  }, []);
  React.useEffect(() => {
    if (!audioSource || (options.length && !options.some((o) => o.id === audioSource))) {
      setAudioSource("none");
    }
  }, [JSON.stringify(options)]);

  return (
    isScreen && (
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
