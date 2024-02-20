import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useAssets } from "expo-asset";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { useColorScheme } from "react-native";
import Stack from "./navigation/Stack";
import Root from "./navigation/RootNavigation";

export default function App() {
   const [isAppReady, setIsAppReady] = useState(false);
   const [assets] = useAssets([require("./test.jpg")]);
   const [fontLoaded] = Font.useFonts(IonIcons.font);
   const isDarkMode = useColorScheme() === "dark";

   useEffect(() => {
      const onInit = async () => {
         try {
            // Make API CALLS
         } catch (error) {
            // Catch API ERRORS
         } finally {
            setIsAppReady(true);
         }
      };
      onInit();
   }, []);

   const onLayoutRootView = useCallback(async () => {
      if (assets && fontLoaded && isAppReady) {
         await SplashScreen.hideAsync();
      }
   }, [assets, fontLoaded, isAppReady]);

   if (!fontLoaded || !assets) {
      return null;
   }

   return (
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
         {/* <Stack /> */}
         {/* <Tabs /> */}
         <Root />
      </NavigationContainer>
   );
}
