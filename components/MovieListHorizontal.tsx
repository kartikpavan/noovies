import { FlatList } from "react-native";
import React from "react";
import { Movie } from "../utils/types";
import styled from "styled-components/native";
import Card from "./Card";

type Props = {
   title: string;
   contents: Movie[];
};

const MovieListHorizontal = ({ title, contents }: Props) => {
   return (
      <TrendingMoviesContainer>
         <ListTitle>{title}</ListTitle>
         <FlatList
            data={contents}
            renderItem={({ item }) => <Card movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
         />
      </TrendingMoviesContainer>
   );
};

export default MovieListHorizontal;

const TrendingMoviesContainer = styled.View`
   margin-left: 20px;
`;

const ListTitle = styled.Text`
   font-size: 18px;
   font-weight: 600;
   color: ${(props) => props.theme.textColor};
   margin-top: 20px;
   margin-bottom: 20px;
`;
