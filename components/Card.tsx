import React from "react";
import styled from "styled-components/native";
import { Movie } from "../utils/types";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import Rating from "./Rating";

type Props = { movie: Movie };

const Card = ({ movie }: Props) => {
   return (
      <SingleMovieCard>
         <Poster imgUrl={makeImgPath(movie.poster_path)} />
         <Title>{movie.title.slice(0, 10)}</Title>
         <Rating movieRating={movie.vote_average} />
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
