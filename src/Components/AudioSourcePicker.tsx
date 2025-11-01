import { util } from "replugged";
import { React } from "replugged/common";
import { Select } from "replugged/components";
import { SettingValues } from "@this";
import { DefaultSettings, SoundshareSupported } from "@consts";
import { MediaEngineStore, NativeSources } from "@lib/RequiredModules";

export default (): React.ReactElement => {
  const MediaEngine = MediaEngineStore?.getMediaEngine();

  const [options, setOptions] = React.useState<Array<{ label: string; value: string }>>([]);

  const [audioSource, setAudioSource] = util.useSettingArray(
    SettingValues,
    "audioSource",
    DefaultSettings.audioSource,
  );

  const getPreviewAndSetOptions = async () => {
    if (!MediaEngine || !SoundshareSupported) return;

    const ScreenSources = await NativeSources.get(MediaEngine, ["window", "screen"], {
      width: 1,
      height: 1,
    });

    const PreviewOptions = ScreenSources.map((p) => ({
      label: p.name,
      value: p.id,
    }));

    setOptions(() => [
      {
        label: "None",
        value: "none",
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
    const noOptions = options.length && !options.some((o) => o.value === audioSource);
    if (!audioSource || noOptions) setAudioSource("none");
  }, [options]);

  if (!MediaEngine || !SoundshareSupported) return null;

  return (
    <Select label="Audio Source" options={options} value={audioSource} onChange={setAudioSource} />
  );
};
