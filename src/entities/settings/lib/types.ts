export type LogoType = {
  storageUrl: string;
  width: number;
};

export type PaletteType = {
  accent: string;
};

export type SiteModeType = {
  id: number;
  name: string;
};

export type SettingsApiType = {
  logoSvg: LogoType;
  phone: string;
  colorPallet: PaletteType;
  name: string;
  siteModeTypes: SiteModeType[];
  compareSpecHost: string;
  policy: string;
  tgBotName: string;
};
