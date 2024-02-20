import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";

const NativeStack = createNativeStackNavigator();

const Screen1 = ({ navigation }) => (
   <View>
      <Pressable onPress={() => navigation.navigate("Screen2")}>
         <Text>Screen1</Text>
      </Pressable>
   </View>
);
const Screen2 = ({ navigation }) => (
   <View>
      <Pressable onPress={() => navigation.navigate("Screen3")}>
         <Text>Screen2</Text>
      </Pressable>
   </View>
);
const Screen3 = ({ navigation }) => (
   <View>
      <Pressable onPress={() => navigation.navigate("Tabs", { screen: "Search" })}>
         <Text>Screen3</Text>
      </Pressable>
   </View>
);

function Stack() {
   return (
      <NativeStack.Navigator
         screenOptions={{
            headerTitleAlign: "center",
         }}>
         <NativeStack.Screen name="Screen1" component={Screen1} />
         <NativeStack.Screen name="Screen2" component={Screen2} />
         <NativeStack.Screen name="Screen3" component={Screen3} />
      </NativeStack.Navigator>
   );
}

export default Stack;
