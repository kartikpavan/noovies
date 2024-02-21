import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import IonIcons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function Tabs() {
   const isDarkMode = useColorScheme() === "dark";

   return (
      <Tab.Navigator
         initialRouteName="Movies"
         sceneContainerStyle={{ backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR }}
         screenOptions={{
            tabBarActiveTintColor: isDarkMode ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDarkMode ? LIGHT_GREY : DARK_GREY,
            tabBarStyle: { backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR },
            headerStyle: { backgroundColor: isDarkMode ? BLACK_COLOR : WHITE_COLOR },
            headerTitleStyle: { color: isDarkMode ? "white" : BLACK_COLOR },
            headerTitleAlign: "center",
            tabBarLabelStyle: {
               fontSize: 13,
               fontWeight: "600",
               marginTop: 0,
            },
         }}>
         <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
               tabBarLabel: "Movies",
               // color is coming from screenOptions
               tabBarIcon: ({ focused, color, size }) => {
                  return <IonIcons name={focused ? "film" : "film-outline"} size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="TV"
            component={Tv}
            options={{
               tabBarLabel: "TV",
               // color is coming from screenOptions
               tabBarIcon: ({ focused, color, size }) => {
                  return <IonIcons name={focused ? "tv" : "tv-outline"} size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="Search"
            component={Search}
            options={{
               tabBarLabel: "Search",
               // color is coming from screenOptions
               tabBarIcon: ({ focused, color, size }) => {
                  return (
                     <IonIcons name={focused ? "search-circle" : "search-circle-outline"} size={size} color={color} />
                  );
               },
            }}
         />
      </Tab.Navigator>
   );
}
export default Tabs;
