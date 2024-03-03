import { styled } from "styled-components/native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDetails, useCredits, useRecommendations } from "../api/details";
import { ActivityIndicator, Alert, Dimensions, FlatList, Linking, ScrollView, StyleSheet } from "react-native";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import Poster from "../components/Poster";
import { getYear, makeImgPath } from "../utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import IonIcons from "@expo/vector-icons/Ionicons";
import Rating from "../components/Rating";
import Badge from "../components/Badge";
import CastCard from "../components/CastCard";
import Card from "../components/Card";
import { moviesURL, tvSeriesURL } from "../utils/constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Details: React.FC<NativeStackScreenProps<any, "Details">> = ({ navigation, route }) => {
   //  ID  and isTvSeries(flag) are being recieved
   const id = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;
   console.log(id);
   const { data, isLoading } = useDetails(isTvSeries ? tvSeriesURL : moviesURL, id);
   const { data: movieCredits } = useCredits(isTvSeries ? tvSeriesURL : moviesURL, id);
   const { data: recommendations } = useRecommendations(isTvSeries ? tvSeriesURL : moviesURL, id);

   // Watch Movie / Series
   const OpenURL = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert(`Don't know how to open this URL: ${url}`);
   };

   // useEffect(() => {
   //    navigation.setOptions({
   //       title: isTvSeries ? "TV Series" : "Movie",
   //    });
   // }, []);

   if (isLoading) {
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
               <Background style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(data.backdrop_path) }} />
               <LinearGradient
                  // Background Linear Gradient
                  colors={["transparent", BLACK_COLOR]}
                  style={StyleSheet.absoluteFill}
               />
               <Column>
                  <Poster imgUrl={makeImgPath(data.poster_path)} />
                  <FlexColumn>
                     <Title>{data?.name || data?.original_title}</Title>
                     {data?.first_air_date && <Date>{getYear(data?.first_air_date)}</Date>}
                     {data?.release_date && <Date>{getYear(data?.release_date)}</Date>}
                  </FlexColumn>
               </Column>
            </Header>
            <ExtraInfo>
               <FlexRow>
                  <Rating movieRating={data?.vote_average} />
                  {data?.seasons?.length && <SeasonOrRunTime>{`${data.seasons.length} seasons`}</SeasonOrRunTime>}
                  {data?.runtime && <SeasonOrRunTime>{`${data.runtime}m`}</SeasonOrRunTime>}
                  <Badge>
                     <PGRating>{data?.adult ? "A 18+" : "U/A 13+"}</PGRating>
                  </Badge>
               </FlexRow>
               <IconsContainer>
                  <IonIcons name="bookmark-outline" size={22} color={WHITE_COLOR} />
                  <IonIcons
                     onPress={() => Alert.alert("Share", "Coming Soon")}
                     name="share-social-outline"
                     size={22}
                     color={WHITE_COLOR}
                  />
               </IconsContainer>
            </ExtraInfo>
            <Overview>{data.overview}</Overview>
            <WatchNowBtn onPress={() => OpenURL(data.homepage)}>
               <IonIcons name="play" size={20} color={BLACK_COLOR} />
               <BtnText>Watch Now</BtnText>
            </WatchNowBtn>
            <WatchTrailerBtn>
               <BtnText style={{ color: YELLOW_COLOR }}>Play Trailer</BtnText>
            </WatchTrailerBtn>
            <ListContainer>
               <CastTitle>Cast</CastTitle>
               {movieCredits?.length! > 0 ? (
                  <FlatList
                     data={movieCredits}
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
                  <ListTitle2 onPress={() => navigation.navigate("Reviews", { id, isTvSeries })}>Reviews</ListTitle2>
               </ListTitleContainer>
               {isTvSeries ? (
                  <FlatList
                     data={recommendations}
                     renderItem={({ item }) => (
                        <Card
                           id={item.id}
                           poster={item.poster_path}
                           title={item.original_name}
                           rating={item.vote_average}
                           isTvSeries
                        />
                     )}
                     style={{ marginHorizontal: 20, marginTop: 10 }}
                     keyExtractor={(item) => item.id.toString()}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{ gap: 20 }}
                  />
               ) : (
                  <FlatList
                     data={recommendations}
                     renderItem={({ item }) => (
                        <Card
                           id={item.id}
                           poster={item.poster_path}
                           title={item.original_title}
                           rating={item.vote_average}
                           isTvSeries={false}
                        />
                     )}
                     style={{ marginHorizontal: 20, marginTop: 10 }}
                     keyExtractor={(item) => item.id.toString()}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{ gap: 20 }}
                  />
               )}
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
