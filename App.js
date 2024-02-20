import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./navigation/Tabs";
import Movies from "./screens/Movies";
const Stack = createNativeStackNavigator();

function HomeScreen() {
   return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
         <Text>Home Screen</Text>
      </View>
   );
}

export default function App() {
   const [isAppReady, setIsAppReady] = useState(false);
   const [assets] = useAssets([require("./test.jpg")]);
   const [fontLoaded] = Font.useFonts(IonIcons.font);

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
      <NavigationContainer>
         <Tabs />
      </NavigationContainer>
   );
}
