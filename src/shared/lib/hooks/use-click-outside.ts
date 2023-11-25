import { RefObject, useEffect } from 'react';

export default function useClickOutside(ref: RefObject<HTMLElement>, cb: () => void) {
  const handleClick = (evt: MouseEvent) => {
    if (ref.current && !ref.current.contains(evt.target as Node)) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
}
