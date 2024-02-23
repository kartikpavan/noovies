import React from "react";
import { styled } from "styled-components/native";
import { LIGHT_GREY } from "../utils/colors";

import TopTabs from "../navigation/TopTabs";
import { useSearchContext } from "../context/SearchContext";

const Search = () => {
   const { searchTerm, setSearchTerm, onSubmit } = useSearchContext();

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
         <TopTabs />
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
