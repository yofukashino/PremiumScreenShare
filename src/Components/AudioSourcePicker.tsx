import { React } from "replugged/common";
import { FormItem, Select } from "replugged/components";
import { SettingValues } from "../index";
import { defaultSettings, isLinux } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
export default (): React.ReactElement => {
  const MediaEngine = Modules.MediaEngineStore?.getMediaEngine();
  if (!MediaEngine || isLinux) return null;
  const [options, setOptions] = React.useState<Array<{ label: string; value: string }>>([]);
  const [audioSource, setAudioSource] = Utils.useSettingArray(
    SettingValues,
    "audioSource",
    defaultSettings.audioSource,
  );
  const getPreviewAndSetOptions = async () => {
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
      value: p.id,
    }));
    setOptions(() => [
      {
        label: "None",
        value: "none",
      },
      ...previewOptions,
    ]);
  };
  React.useEffect(() => {
    getPreviewAndSetOptions();
    const checkInterval = setInterval(getPreviewAndSetOptions, 3000);
    return () => clearInterval(checkInterval);
  }, []);
  React.useEffect(() => {
    if (!audioSource || (options.length && !options.some((o) => o.value === audioSource))) {
      setAudioSource("none");
    }
  }, [JSON.stringify(options)]);
  return (
    <FormItem
      title="Audio Source"
      style={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
      }}
      divider={false}>
      <Select options={options} value={audioSource} onChange={setAudioSource} />
    </FormItem>
  );
};
