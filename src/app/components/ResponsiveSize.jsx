import { useState, useEffect } from "react";

// iconSize1: for ambient button icons
// iconSize2: for track mute/unmute icons
// iconSize3: for theme icon
const ResponsiveSize = () => {
  const [size, setSizes] = useState({
    iconSize1: 48,
    iconSize2: 24,
    iconSize3: 32,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newSizes = {};

      if (windowWidth >= 1280) {
        newSizes = {
          iconSize1: 48,
          iconSize2: 24,
          iconSize3: 32,
        }; // xl size
      } else if (windowWidth >= 1024) {
        newSizes = {
          iconSize1: 40,
          iconSize2: 22,
          iconSize3: 30,
        }; // lg size
      } else if (windowWidth >= 640) {
        newSizes = {
          iconSize1: 32,
          iconSize2: 20,
          iconSize3: 28,
        }; // sm size
      } else {
        newSizes = {
          iconSize1: 32,
          iconSize2: 20,
          iconSize3: 28,
        }; // default size
      }
      setSizes(newSizes);
    };

    handleResize(); // set initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default ResponsiveSize;
