import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useReviews } from "../api/details";
import { moviesURL, tvSeriesURL } from "../utils/constants";

const Reviews: React.FC<NativeStackScreenProps<any, "Reviews">> = ({ navigation, route }) => {
   const itemId = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;

   const { data: reviews, isLoading } = useReviews(isTvSeries ? tvSeriesURL : moviesURL, itemId);

   return (
      <View>
         <Text>{`ReviesID : ${itemId}`}</Text>
      </View>
   );
};

export default Reviews;

const styles = StyleSheet.create({});
