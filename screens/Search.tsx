import React, { useState } from "react";
import { styled } from "styled-components/native";
import { LIGHT_GREY, YELLOW_COLOR } from "../utils/colors";
import { ActivityIndicator, FlatList } from "react-native";
import { useSearch } from "../api/search";
import SearchCard from "../components/SearchCard";

const Search = () => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   const [showSearchTerm, setShowSearchTerm] = useState<boolean>(false);
   const { data: searchResults, isLoading, refetch } = useSearch("movie", searchTerm);

   const onSubmit = () => {
      if (searchTerm === "") return;
      refetch().then(() => setShowSearchTerm(!showSearchTerm));
   };

   console.log(searchResults);

   return (
      <Container>
         <SearchBar
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
            placeholder="Search for TV series or Movies"
            placeholderTextColor={LIGHT_GREY}
            autoCapitalize="none"
            autoCorrect={true}
         />
         {showSearchTerm && (
            <Title>
               Showing Results for <Label>"{searchTerm}"</Label>{" "}
            </Title>
         )}
         {isLoading ? (
            <LoaderContainer>
               <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
            </LoaderContainer>
         ) : (
            <FlatList
               data={searchResults}
               keyExtractor={(item, idx) => `${item.original_title}-${idx}`}
               renderItem={({ item }) => (
                  <SearchCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.original_title}
                     rating={item.vote_average}
                  />
               )}
               numColumns={2}
               contentContainerStyle={{ gap: 10 }}
               showsVerticalScrollIndicator={false}
               // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />}
            />
         )}
      </Container>
   );
};

export default Search;

const Container = styled.View`
   flex: 1;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   width: 90%;
   margin: 0px 0px 10px 25px;
`;
const Label = styled.Text`
   color: yellow;
`;

const SearchBar = styled.TextInput`
   background-color: ${(props) => props.theme.secondaryBgColor};
   color: ${(props) => props.theme.textColor};
   padding: 10px 15px;
   border-radius: 10px;
   width: 90%;
   margin: 15px auto;
`;

const LoaderContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;
