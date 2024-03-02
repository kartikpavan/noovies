import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import MoviesTab from "../components/MoviesTab";
import TvTab from "../components/TvTab";

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
   return (
      <Tab.Navigator
         screenOptions={{
            tabBarActiveTintColor: YELLOW_COLOR,
            tabBarInactiveTintColor: LIGHT_GREY,
            tabBarStyle: { backgroundColor: BLACK_COLOR },
            tabBarIndicatorStyle: {
               backgroundColor: YELLOW_COLOR,
            },
         }}>
         <Tab.Screen name="MOVIES" component={MoviesTab} />
         <Tab.Screen name="TV" component={TvTab} initialParams={{ title: "TV_TITLE" }} />
      </Tab.Navigator>
   );
}

export default TopTabs;
