import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";

const Tab = createBottomTabNavigator();

function Tabs() {
   const isDarkMode = useColorScheme() === "dark";

   return (
      <Tab.Navigator
         initialRouteName="Movies"
         screenOptions={{
            tabBarActiveTintColor: isDarkMode ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDarkMode ? "#d2dae2" : "#808e9b",
            tabBarStyle: { backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR },
            headerStyle: {
               backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR,
            },
            headerTitleStyle: {
               color: isDarkMode ? "white" : BLACK_COLOR,
            },
            headerTitleAlign: "center",
         }}>
         <Tab.Screen name="Movies" component={Movies} />
         <Tab.Screen name="TV" component={Tv} />
         <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
   );
}
export default Tabs;
