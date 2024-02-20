import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import IonIcons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function Tabs() {
   return (
      <Tab.Navigator
         initialRouteName="Movies"
         screenOptions={{
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "purple",
            headerTitleAlign: "center",
            headerRight: () => <IonIcons name="search" size={24} color="green" />,
         }}>
         <Tab.Screen name="Movies" component={Movies} />
         <Tab.Screen name="TV" component={Tv} />
         <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
   );
}
export default Tabs;
