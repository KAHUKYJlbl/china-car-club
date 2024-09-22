export { ChooseNew } from "./ui/choose-new";
export { fetchSettings } from "./model/api-actions/fetch-settings";
export {
  getLogo,
  getDealerName,
  getPhone,
  getPalette,
  getIsNew,
  getSettingsLoadingStatus,
} from "./model/settings-selectors";
export { setNew, setUsed } from "./model/settings-slice";
