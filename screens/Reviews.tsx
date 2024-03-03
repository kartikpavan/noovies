import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Reviews: React.FC<NativeStackScreenProps<any, "Reviews">> = ({ navigation, route }) => {
   const itemId = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;

   return (
      <View>
         <Text>{`ReviesID : ${itemId}`}</Text>
      </View>
   );
};

export default Reviews;

const styles = StyleSheet.create({});
