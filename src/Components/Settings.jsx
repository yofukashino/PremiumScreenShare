import { common } from "replugged";
import { pss } from "../index.jsx";
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (pss.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    pss.set(key, value);
  }
};

export const Settings = () => {
  return <div></div>;
};
