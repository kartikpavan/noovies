import { ActivityIndicator, FlatList } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { YELLOW_COLOR } from "../utils/colors";
import SearchCard from "./SearchCard";
import { useTvSearch } from "../api/search";
import { useSearchContext } from "../context/SearchContext";

const TvTab = () => {
   const { searchTerm } = useSearchContext();
   const { data, isLoading } = useTvSearch(searchTerm, 1);
   return (
      <View>
         {isLoading ? (
            <LoaderContainer>
               <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
            </LoaderContainer>
         ) : (
            <FlatList
               data={data}
               keyExtractor={(item, idx) => `${item.original_name}-${idx}`}
               renderItem={({ item }) => (
                  <SearchCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.name}
                     rating={item.vote_average}
                     isTvSeries={true}
                  />
               )}
               numColumns={3}
               contentContainerStyle={{ gap: 10 }}
               showsVerticalScrollIndicator={false}
            />
         )}
      </View>
   );
};

export default TvTab;

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
