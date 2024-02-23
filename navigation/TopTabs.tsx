import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import MoviesTab from "../components/MoviesTab";
import TvTab from "../components/TvTab";

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
   const isDarkMode = useColorScheme() === "dark";

   return (
      <Tab.Navigator
         screenOptions={{
            tabBarActiveTintColor: isDarkMode ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDarkMode ? LIGHT_GREY : DARK_GREY,
            tabBarStyle: { backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR },
            tabBarIndicatorStyle: {
               backgroundColor: isDarkMode ? YELLOW_COLOR : BLACK_COLOR,
            },
         }}>
         <Tab.Screen name="MOVIES" component={MoviesTab} />
         <Tab.Screen name="TV" component={TvTab} initialParams={{ title: "TV_TITLE" }} />
      </Tab.Navigator>
   );
}

export default TopTabs;
