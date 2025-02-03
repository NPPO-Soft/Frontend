import { useEffect, useState } from "react";
import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    "UT-Sans": require("../assets/fonts/UT-Sans.ttf"),
  });
};

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await useFonts();
      setFontsLoaded(true);
    })();
  }, []);

  return fontsLoaded;
};
