import { useState, useEffect } from "react";

let defaultHeight;
let defaultWidth;

const useScreenSize = () => {
  const [dimensions, setDimensions] = useState({
    windowHeight: defaultHeight,
    windowWidth: defaultWidth,
  });

  useEffect(() => {
    const handler = () =>
      setDimensions({
        windowHeight: window?.innerHeight,
        windowWidth: window?.innerWidth,
      });
    handler();
    window.addEventListener(`resize`, handler);
    return () => window.removeEventListener(`resize`, handler);
  }, []);

  return dimensions;
};
export default useScreenSize;
