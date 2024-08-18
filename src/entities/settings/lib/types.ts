export type LogoType = {
  storageUrl: string;
  width: number;
};

export type PaletteType = {
  accent: string;
};

export type SettingsApiType = {
  logoSvg: LogoType;
  phone: string;
  colorPallet: PaletteType;
  name: string;
};
