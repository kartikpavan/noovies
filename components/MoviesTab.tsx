import { ActivityIndicator, FlatList } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { YELLOW_COLOR } from "../utils/colors";
import SearchCard from "./SearchCard";
import { useMovieSearch } from "../api/search";
import { useSearchContext } from "../context/SearchContext";

const MoviesTab = () => {
   const { searchTerm } = useSearchContext();
   const { data: movieResults, isLoading: movieIsLoading } = useMovieSearch(searchTerm, 1);

   return (
      <View>
         {movieIsLoading ? (
            <LoaderContainer>
               <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
            </LoaderContainer>
         ) : (
            <FlatList
               data={movieResults}
               keyExtractor={(item, idx) => `${item.title}-${idx}`}
               renderItem={({ item }) => (
                  <SearchCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.title}
                     rating={item.vote_average}
                     isTvSeries={false}
                  />
               )}
               numColumns={3}
               contentContainerStyle={{ gap: 10 }}
            />
         )}
      </View>
   );
};

export default MoviesTab;

const View = styled.View`
   background-color: ${(props) => props.theme.mainBgColor};
   flex: 1;
`;
const LoaderContainer = styled.View`
   flex: 1;
   padding-top: 100px;
   align-items: center;
   justify-content: center;
`;
