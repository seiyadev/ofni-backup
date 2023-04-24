import { useEffect, useLayoutEffect, useState } from "react";

export default function IsWide() {
  const [isWide, setIsWide] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsWide(mediaQuery.matches);
    const handleMediaQueryChange = (e) => setIsWide(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return isWide;
}
