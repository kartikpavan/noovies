import React from "react";
import styled from "styled-components/native";
import { Movie } from "../utils/types";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import Rating from "./Rating";

type Props = { poster: string; title: string; rating: number };

const Card = ({ poster, title, rating }: Props) => {
   return (
      <SingleMovieCard>
         <Poster imgUrl={makeImgPath(poster)} />
         <Title>{title.slice(0, 10)}</Title>
         <Rating movieRating={rating} />
      </SingleMovieCard>
   );
};

export default Card;

const SingleMovieCard = styled.View`
   width: 110px;
   align-items: center;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   margin-top: 5px;
`;
