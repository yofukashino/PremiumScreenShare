import { patchBetterReadablityText } from "./BetterReadablityText";
import { patchQualityUpdater } from "./QualityUpdater";
import { patchSettingSetter } from "./SettingValues";
export const applyInjections = (): void => {
  patchBetterReadablityText();
  patchQualityUpdater();
  patchSettingSetter();
};
