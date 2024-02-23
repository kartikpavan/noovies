import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

type Props = { id: number; poster: string; title: string; rating: number };

const SearchCard = ({ poster, title, rating, id }: Props) => {
   const navigation = useNavigation();
   return (
      // @ts-ignore
      <Container onPress={() => navigation.navigate("Stack", { screen: "Details", params: { id } })}>
         <SingleMovieCard>
            <Poster imgUrl={makeImgPath(poster)} />
            <Title>{title.slice(0, 10)}</Title>
            <Rating movieRating={rating} />
         </SingleMovieCard>
      </Container>
   );
};

export default SearchCard;

const Container = styled.TouchableOpacity`
   width: 50%;
   padding: 5px;
`;

const SingleMovieCard = styled.View`
   width: 100%;
   align-items: center;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   margin-top: 5px;
`;
