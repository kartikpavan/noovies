import { styled } from "styled-components/native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Details: React.FC<NativeStackScreenProps<any, "Details">> = ({ navigation, route }) => {
   const params = route.params!;
   console.log(params);

   useEffect(() => {
      navigation.setOptions({
         title: params.title,
      });
   }, []);
   return <Container></Container>;
};

export default Details;

const Container = styled.View`
   flex: 1;
   background-color: ${(props) => props.theme.mainBgColor};
`;
