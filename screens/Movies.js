import styled from "styled-components/native";
import React from "react";
import { YELLOW_COLOR } from "../utils/colors";

const Movies = ({ navigation }) => {
   return (
      <Btn onPress={() => navigation.navigate("Stack", { screen: "Screen3" })}>
         <Title>Movies</Title>
      </Btn>
   );
};

export default Movies;

const Btn = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
`;

const Title = styled.Text`
   color: ${YELLOW_COLOR};
`;
