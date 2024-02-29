import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import Details from "../screens/Details";
import { BLACK_COLOR, WHITE_COLOR } from "../utils/colors";

const NativeStack = createNativeStackNavigator();

function Stack() {
   const isDarkMode = useColorScheme() === "dark";
   return (
      <NativeStack.Navigator
         screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR },
            headerTitleStyle: { color: isDarkMode ? "white" : BLACK_COLOR },
         }}
      >
         <NativeStack.Screen name="Details" component={Details} />
      </NativeStack.Navigator>
   );
}

export default Stack;
