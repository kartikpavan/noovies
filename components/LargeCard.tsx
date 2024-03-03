import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import { YELLOW_COLOR } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

type Props = {
   id: number;
   title: string;
   release_date: string;
   overview: string;
   poster_path: string;
};

const LargeCard = ({ id, title, release_date, overview, poster_path }: Props) => {
   const navigation = useNavigation();
   return (
      <View
         onPress={() => {
            // @ts-ignore
            navigation.navigate("Stack", { screen: "MovieDetails", params: { id: id } });
         }}
      >
         <Poster imgUrl={makeImgPath(poster_path)} />
         <Column>
            <Title>{title}</Title>
            <Date>{release_date}</Date>
            <Description>{overview.slice(0, 100)}...</Description>
         </Column>
      </View>
   );
};

export default LargeCard;

const View = styled.Pressable`
   flex-direction: row;
   padding-left: 20px;
   padding-top: 20px;
`;

const Column = styled.View`
   width: 60%;
   margin-left: 15px;
`;

const Title = styled.Text`
   font-size: 18px;
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   letter-spacing: 0.5px;
`;

const Date = styled.Text`
   margin-top: 5px;
   color: ${YELLOW_COLOR};
`;

const Description = styled.Text`
   color: ${(props) => props.theme.textColor};
   margin-top: 5px;
`;
