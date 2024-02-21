import { FlatList } from "react-native";
import React from "react";
import { Movie } from "../utils/types";
import styled from "styled-components/native";
import Card from "./Card";
import LargeCard from "./LargeCard";

type Props = {
   title: string;
   contents: Movie[];
};

const MovieListVertical = ({ title, contents }: Props) => {
   return (
      <MoviesContainer>
         <ListTitle>{title}</ListTitle>
         <Container>
            {contents.map((item) => {
               return <LargeCard movie={item} key={item.id} />;
            })}
         </Container>
      </MoviesContainer>
   );
};

export default MovieListVertical;

const MoviesContainer = styled.View`
   margin-left: 20px;
   margin-top: 20px;
`;

const Container = styled.View`
   gap: 40px;
`;
const ListTitle = styled.Text`
   font-size: 18px;
   font-weight: 600;
   margin-bottom: 20px;
   color: ${(props) => props.theme.textColor};
`;
