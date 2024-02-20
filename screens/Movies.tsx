import styled from "styled-components/native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
   return (
      <Btn onPress={() => navigation.navigate("Stack", { screen: "Screen3" })}>
         <Title>Movies</Title>
      </Btn>
   );
};

export default Movies;

const Btn = styled.Pressable`
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
`;
