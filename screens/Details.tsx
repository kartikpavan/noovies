import { styled } from "styled-components/native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDetails, useCredits, useRecommendations } from "../api/details";
import {
   ActivityIndicator,
   Alert,
   Dimensions,
   FlatList,
   Linking,
   ScrollView,
   Share,
   StyleSheet,
} from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import Poster from "../components/Poster";
import { getYear, makeImgPath } from "../utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import IonIcons from "@expo/vector-icons/Ionicons";
import Rating from "../components/Rating";
import Badge from "../components/Badge";
import CastCard from "../components/CastCard";
import { tvSeriesURL } from "../utils/constants";
import TvCard from "../components/TvCard";
import { FavoriteItem } from "../utils/types";
import { getValueFromStore, saveToStore } from "../utils/storage";
import Toast from "react-native-toast-message";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Details: React.FC<NativeStackScreenProps<any, "Details">> = ({ navigation, route }) => {
   const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

   //  ID  and isTvSeries(flag) are being recieved
   const id = route.params?.id;
   console.log(id);
   const { data, isLoading } = useDetails(tvSeriesURL, id);
   const { data: credits, isLoading: isLoadingCredits } = useCredits(tvSeriesURL, id);
   const { data: recommendations, isLoading: isLoadingRecommendations } = useRecommendations(
      tvSeriesURL,
      id
   );

   // Watch Movie / Series
   const OpenURL = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert(`Don't know how to open this URL: ${url}`);
   };

   // Share Media
   const ShareMedia = async () => {
      await Share.share({
         url: data?.homepage,
         message: data?.overview,
         title: data?.name,
      });
   };

   // Add to Favorites
   async function addFavoriteItem(favItem: FavoriteItem) {
      let favoriteItems = await getValueFromStore("favoriteItems"); // Retrieve the current favorite items

      let parsedFavoriteItems: FavoriteItem[] = [];
      if (favoriteItems) {
         parsedFavoriteItems = JSON.parse(favoriteItems); // Parse the JSON string back into an array
      }

      const itemIndex = parsedFavoriteItems.findIndex((item) => item.id === favItem.id);
      // Item is already in favorites, remove it
      if (itemIndex !== -1) {
         parsedFavoriteItems.splice(itemIndex, 1);
      } else {
         // Item is not in favorites, add it
         parsedFavoriteItems.push(favItem);
      }

      await saveToStore("favoriteItems", JSON.stringify(parsedFavoriteItems)); // Save the updated array back to the store
      setFavoriteItems(parsedFavoriteItems); // Update the state
      Toast.show({
         type: itemIndex !== -1 ? "error" : "success",
         text1: itemIndex !== -1 ? "Removed from Favorites" : "Added to Favorites",
      });
   }

   // Get the favorite items from the store to toggle te bookmark icon
   useEffect(() => {
      async function getFavoriteItems() {
         let favoriteItems = await getValueFromStore("favoriteItems"); // Retrieve the stored favorite items

         let parsedFavoriteItems: FavoriteItem[] = [];
         if (favoriteItems) {
            parsedFavoriteItems = JSON.parse(favoriteItems); // Parse the JSON string back into an array
         }
         setFavoriteItems(parsedFavoriteItems);
      }
      getFavoriteItems();
   }, []);

   const isInFavorites = favoriteItems.some((item) => item.id === id);

   if (isLoading || isLoadingCredits || isLoadingRecommendations) {
      return (
         <LoaderContainer>
            <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
         </LoaderContainer>
      );
   }

   return (
      <ScrollView contentContainerStyle={{ backgroundColor: BLACK_COLOR }}>
         <Container>
            <Header>
               <Background
                  style={StyleSheet.absoluteFill}
                  source={{ uri: makeImgPath(data.backdrop_path) }}
               />
               <LinearGradient
                  // Background Linear Gradient
                  colors={["transparent", BLACK_COLOR]}
                  style={StyleSheet.absoluteFill}
               />
               <Column>
                  <Poster imgUrl={makeImgPath(data.poster_path)} />
                  <FlexColumn>
                     <Title>{data?.name}</Title>
                     {data?.first_air_date && <Date>{getYear(data?.first_air_date)}</Date>}
                  </FlexColumn>
               </Column>
            </Header>
            <ExtraInfo>
               <FlexRow>
                  <Rating movieRating={data?.vote_average} />
                  {data?.seasons?.length && (
                     <SeasonOrRunTime>{`${data.seasons.length} seasons`}</SeasonOrRunTime>
                  )}
                  {data?.runtime && <SeasonOrRunTime>{`${data.runtime}m`}</SeasonOrRunTime>}
                  <Badge>
                     <PGRating>{data?.adult ? "A 18+" : "U/A 13+"}</PGRating>
                  </Badge>
               </FlexRow>
               <IconsContainer>
                  <IonIcons
                     onPress={() =>
                        addFavoriteItem({
                           id: id,
                           title: data?.name,
                           poster_path: data?.poster_path,
                           mediaType: "tv",
                        })
                     }
                     name={isInFavorites ? "bookmark" : "bookmark-outline"}
                     size={22}
                     color={isInFavorites ? YELLOW_COLOR : WHITE_COLOR}
                  />
                  <IonIcons
                     onPress={ShareMedia}
                     name="share-social-outline"
                     size={22}
                     color={WHITE_COLOR}
                  />
               </IconsContainer>
            </ExtraInfo>
            {data?.overview && <Overview>{data.overview}</Overview>}
            {data?.homepage && (
               <WatchNowBtn onPress={() => OpenURL(data?.homepage)}>
                  <IonIcons name="play" size={20} color={BLACK_COLOR} />
                  <BtnText>Watch Now</BtnText>
               </WatchNowBtn>
            )}
            <WatchTrailerBtn>
               <BtnText style={{ color: YELLOW_COLOR }}>Play Trailer</BtnText>
            </WatchTrailerBtn>
            <ListContainer>
               <CastTitle>Cast</CastTitle>
               {credits?.length! > 0 ? (
                  <FlatList
                     data={credits}
                     keyExtractor={(item) => item.id.toString()}
                     renderItem={({ item }) => <CastCard cast={item} />}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{ gap: 5 }}
                     style={{ marginHorizontal: 10, marginTop: 10 }}
                  />
               ) : (
                  <CastTitle>Oops! No Cast Available</CastTitle>
               )}
            </ListContainer>
            <ListContainer style={{ marginBottom: 20, marginTop: 20 }}>
               <ListTitleContainer>
                  <ListTitle>More like this</ListTitle>
                  <ListTitle2
                     onPress={() => navigation.navigate("Reviews", { id, isTvSeries: true })}
                  >
                     Reviews
                  </ListTitle2>
               </ListTitleContainer>
               <FlatList
                  data={recommendations}
                  renderItem={({ item }) => (
                     <TvCard
                        id={item.id}
                        poster={item.poster_path}
                        title={item.original_name}
                        rating={item.vote_average}
                     />
                  )}
                  style={{ marginHorizontal: 20, marginTop: 20 }}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 20 }}
               />
            </ListContainer>
         </Container>
      </ScrollView>
   );
};

export default Details;

const Container = styled.View`
   flex: 1;
   background-color: ${(props) => props.theme.mainBgColor};
`;

const LoaderContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
   background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
   height: ${SCREEN_HEIGHT / 4}px;
   justify-content: flex-end;
   padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
   flex-direction: row;
   align-items: center;
`;

const FlexColumn = styled.View`
   flex-direction: col;
   gap: 5px;
   margin-left: 15px;
   width: 80%;
`;

const Title = styled.Text`
   color: ${WHITE_COLOR};
   font-size: 26px;
   font-weight: 600;
   width: 80%;
`;

const Date = styled.Text`
   color: ${YELLOW_COLOR};
   font-weight: 600;
`;

const PGRating = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 500;
`;

const SeasonOrRunTime = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 500;
`;

const FlexRow = styled.View`
   flex-direction: row;
   gap: 10px;
   align-items: center;
   justify-content: center;
`;

const ExtraInfo = styled.View`
   width: 90%;
   color: ${(props) => props.theme.textColor};
   margin: 30px 20px 0px;
   flex-direction: row;
   gap: 10px;
   align-items: center;
   justify-content: space-between;
`;

const IconsContainer = styled.View`
   flex-direction: row;
   gap: 20px;
   align-items: center;
   justify-content: center;
`;

const Overview = styled.Text`
   color: ${(props) => props.theme.textColor};
   margin: 10px 20px 30px;
`;

const WatchNowBtn = styled.TouchableOpacity`
   background-color: ${YELLOW_COLOR};
   padding: 8px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   flex-direction: row;
   gap: 5px;
   width: 90%;
   align-self: center;
`;

const BtnText = styled.Text`
   font-weight: 600;
   font-size: 16px;
`;

const WatchTrailerBtn = styled.TouchableOpacity`
   background-color: transparent;
   border: 1px solid ${YELLOW_COLOR};
   padding: 8px;
   margin: 20px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   width: 90%;
   align-self: center;
`;

const ListContainer = styled.View`
   margin-top: 10px;
`;

const ListTitleContainer = styled.View`
   margin-left: 20px;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   width: 90%;
   text-align: center;
`;

const CastTitle = styled.Text`
   font-size: 16px;
   font-weight: 600;
   margin-left: 20px;
   color: ${(props) => props.theme.textColor};
`;

const ListTitle = styled.Text`
   color: ${YELLOW_COLOR};
   font-size: 16px;
   font-weight: 600;
   width: 50%;
   border-bottom-color: ${YELLOW_COLOR};
   border-bottom-width: 2px;
   text-align: center;
`;

const ListTitle2 = styled.Text`
   color: ${DARK_GREY};
   font-size: 16px;
   font-weight: 600;
   border-bottom-color: ${DARK_GREY};
   border-bottom-width: 2px;
   width: 50%;
   text-align: center;
`;
