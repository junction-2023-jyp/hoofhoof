import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
