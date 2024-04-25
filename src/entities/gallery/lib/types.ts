type NameType = {
  ch: string;
  ru: string;
};

export type GalleryType = {
  specificationId: number;
  model: {
    name: string;
    id: number;
  };
  manufacturer: {
    name: string;
    id: number;
  };
  url: {
      big: string;
      original: string;
  };
}

export type GalleryApiType = {
  id: number;
  name: NameType;
  manufacturer: {
    id: number;
    name: NameType;
  };
  series: {
    id: number;
    name: NameType;
  };
  imageUrls: {
    big: string;
    original: string;
  };
}
