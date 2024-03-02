import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import Root from "./navigation/RootNavigation";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/styled";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from "./context/SearchContext";
const queryClient = new QueryClient();

export default function App() {
   const [fontLoaded] = Font.useFonts(IonIcons.font);
   const [isAppReady, setIsAppReady] = useState(false);
   const [assets] = useAssets([require("./test.jpg")]);

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
      // ThemeProvider Coming from styled-components
      <QueryClientProvider client={queryClient}>
         <ThemeProvider theme={darkTheme}>
            <SearchContextProvider>
               <NavigationContainer>
                  <Root />
               </NavigationContainer>
            </SearchContextProvider>
         </ThemeProvider>
      </QueryClientProvider>
   );
}
