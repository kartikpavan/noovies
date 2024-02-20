import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Movies = ({ navigation }) => {
   return (
      <View>
         <Text onPress={() => navigation.navigate("Stack", { screen: "Screen3" })}>Movies</Text>
      </View>
   );
};

export default Movies;

const styles = StyleSheet.create({});
