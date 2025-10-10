import { useState, useEffect } from "react";

const ResponsiveSize = () => {
  const [size, setSizes] = useState({
    iconSize: 48,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newSizes = {};

      if (windowWidth >= 1280) {
        newSizes = {
          iconSize: 48,
        }; // xl size
      } else if (windowWidth >= 1024) {
        newSizes = {
          iconSize: 40,
        }; // lg size
      } else if (windowWidth >= 640) {
        newSizes = {
          iconSize: 32,
        }; // sm size
      } else {
        newSizes = {
          iconSize: 32,
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
