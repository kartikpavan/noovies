import React from "react";
import styled from "styled-components/native";
import IonIcons from "@expo/vector-icons/Ionicons";

const Rating = ({ movieRating }: { movieRating: number }) => {
   return (
      <View>
         <IonIcons name="star" size={13} color="yellow" />
         <Text>{movieRating.toFixed(0)}/10</Text>
      </View>
   );
};

export default Rating;

const View = styled.View`
   flex-direction: row;
   align-items: center;
   gap: 5px;
`;

const Text = styled.Text`
   color: ${(props) => props.theme.textColor};
   margin-top: 5px;
   margin-bottom: 5px;
   font-weight: 500;
`;
