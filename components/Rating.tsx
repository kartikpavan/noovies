import React from "react";
import styled from "styled-components/native";

const Rating = ({ movieRating }: { movieRating: number }) => {
   return <View>🎬 {movieRating.toFixed(1)}/10</View>;
};

export default Rating;

const View = styled.Text`
   color: ${(props) => props.theme.textColor};
   margin-top: 5px;
   margin-bottom: 5px;
   font-weight: 500;
`;
