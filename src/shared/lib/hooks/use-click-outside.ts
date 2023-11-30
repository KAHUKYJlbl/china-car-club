import { RefObject, useEffect } from 'react';

export default function useClickOutside(refArr: RefObject<HTMLElement>[], cb: () => void) {
  const handleClick = (evt: MouseEvent) => {
    if (refArr.every(ref => ref.current) && !refArr.every(ref => ref.current?.contains(evt.target as Node))) {
      setTimeout(cb, 120);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
}
