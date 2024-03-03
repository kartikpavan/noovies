import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type Props = { id: number; poster: string; title: string; rating: number; isTvSeries: boolean };

const TvCard = ({ poster, title, rating, id, isTvSeries = true }: Props) => {
   const navigation = useNavigation();
   return (
      <TouchableOpacity
         onPress={() => {
            // @ts-ignore
            navigation.navigate("Stack", { screen: "Details", params: { id, title, isTvSeries } });
         }}>
         <SingleTvCard>
            <Poster imgUrl={makeImgPath(poster)} />
            <Title>{title.slice(0, 10)}</Title>
            <Rating movieRating={rating} />
         </SingleTvCard>
      </TouchableOpacity>
   );
};

export default TvCard;

const SingleTvCard = styled.View`
   width: 110px;
   align-items: center;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   margin-top: 5px;
`;
