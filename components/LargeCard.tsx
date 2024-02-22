import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import { makeImgPath } from "../utils/helper";
import { Movie } from "../utils/types";
import Rating from "./Rating";
import { YELLOW_COLOR } from "../utils/colors";

type Props = {
   movie: Movie;
};

const LargeCard = ({ movie }: Props) => {
   return (
      <View>
         <Poster imgUrl={makeImgPath(movie.poster_path)} />
         <Column>
            <Title>{movie.original_title}</Title>
            <Date>{movie.release_date}</Date>
            <Description>{movie.overview.slice(0, 100)}...</Description>
         </Column>
      </View>
   );
};

export default LargeCard;

const View = styled.View`
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
   color: white;
   font-weight: 600;
   letter-spacing: 0.5px;
`;

const Date = styled.Text`
   margin-top: 5px;
   color: ${YELLOW_COLOR};
`;

const Description = styled.Text`
   color: rgba(255, 255, 255, 0.7);
   margin-top: 5px;
`;
