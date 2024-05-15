import { useEffect, useState } from 'react';

import classes from './gallery-img.module.sass';

type GalleryImgProps = {
  images: string[];
  currentImage: number;
};

export const GalleryImg = ({ images, currentImage }: GalleryImgProps) => {
  const [ preloadedImages, setPreloadedImages ] = useState<string[]>([]);

  useEffect(() => {
    const promises = images.map((src) => preloadImage(src));

    const preload = async () => {
      const preloadedIimages = await Promise.all(promises);

      setPreloadedImages(preloadedIimages);
    };

    preload();
  }, [images[0]]);

  const preloadImage = (src: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject();
    });
  };

  return (
    <img className={classes.img} src={preloadedImages[currentImage]} />
  );
};
