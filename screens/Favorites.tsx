import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getValueFromStore } from "../utils/storage";
import { FavoriteItem } from "../utils/types";
import styled from "styled-components/native";
import { DARK_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils/helper";
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
   const navigation = useNavigation();
   const [items, setItems] = useState<FavoriteItem[]>([]);
   async function getFavoriteItems() {
      let favoriteItems = await getValueFromStore("favoriteItems"); // Retrieve the stored favorite items

      let parsedFavoriteItems: FavoriteItem[] = [];
      if (favoriteItems) {
         parsedFavoriteItems = JSON.parse(favoriteItems); // Parse the JSON string back into an array
      }
      setItems(parsedFavoriteItems);
   }
   useEffect(() => {
      getFavoriteItems();
   }, []);

   const onRefresh = () => {
      getFavoriteItems();
   };

   const refreshing = false;

   return (
      <>
         {items.length === 0 ? (
            <MainContainer>
               <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>No items</Text>
               <Text style={{ color: YELLOW_COLOR, textAlign: "center" }}>
                  Please go to the details page and click the bookmark icon to add to favorites
               </Text>
            </MainContainer>
         ) : (
            <FlatList
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
               ListHeaderComponent={() => {
                  return (
                     <HeaderTitle>
                        <Span>{items.length}</Span> items
                     </HeaderTitle>
                  );
               }}
               data={items}
               keyExtractor={({ id }) => id.toString()}
               renderItem={({ item }) => {
                  return (
                     <CardContainer
                        onPress={() => {
                           // @ts-ignore
                           navigation.navigate("Stack", {
                              screen: item.mediaType === "tv" ? "Details" : "MovieDetails",
                              params: { id: item.id },
                           });
                        }}
                     >
                        <Card>
                           {item.poster_path && <Poster imgUrl={makeImgPath(item.poster_path)} />}
                           {item.title && <Title>{item.title.slice(0, 10)}</Title>}
                        </Card>
                     </CardContainer>
                  );
               }}
               numColumns={3}
               contentContainerStyle={{ gap: 10 }}
               style={{ marginHorizontal: 10 }}
            />
         )}
      </>
   );
};

export default Favorites;

const MainContainer = styled.View`
   flex: 1;
   align-items: center;
   margin: 0px 20px;
   justify-content: center;
`;

const CardContainer = styled.TouchableOpacity`
   width: 33.33%;
   padding: 5px;
`;
const Text = styled.Text``;

const HeaderTitle = styled.Text`
   font-size: 16px;
   font-weight: 600;
   color: ${DARK_GREY};
   margin: 10px 20px 0px;
`;

const Span = styled.Text`
   color: ${YELLOW_COLOR};
   font-size: 16px;
   font-weight: 600;
`;

const Card = styled.View`
   width: 100%;
   align-items: center;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 600;
   margin-top: 5px;
`;
