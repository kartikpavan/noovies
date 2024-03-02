import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Details from "../screens/Details";
import { BLACK_COLOR, WHITE_COLOR } from "../utils/colors";

const NativeStack = createNativeStackNavigator();

function Stack() {
   return (
      <NativeStack.Navigator
         screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: BLACK_COLOR },
            headerTitleStyle: { color: WHITE_COLOR },
         }}>
         <NativeStack.Screen name="Details" component={Details} />
      </NativeStack.Navigator>
   );
}

export default Stack;
