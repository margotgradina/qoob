import {useEffect, useState} from "react";

const QUERY = "(max-width: 767px)"; // matches tailwind's `max-md`

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};
