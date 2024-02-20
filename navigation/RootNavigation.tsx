import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const RootStack = createNativeStackNavigator();

const Root = () => {
   return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
         <RootStack.Screen name="Tabs" component={Tabs} />
         <RootStack.Screen name="Stack" component={Stack} />
      </RootStack.Navigator>
   );
};

export default Root;
