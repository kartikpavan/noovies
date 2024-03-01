import { styled } from "styled-components/native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDetails } from "../api/details";
import { ActivityIndicator, Alert, Dimensions, Linking, StyleSheet } from "react-native";
import { BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import Poster from "../components/Poster";
import { getYear, makeImgPath } from "../utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import IonIcons from "@expo/vector-icons/Ionicons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const moviesURL = "https://api.themoviedb.org/3/movie/";
const tvSeriesURL = "https://api.themoviedb.org/3/tv/";

const Details: React.FC<NativeStackScreenProps<any, "Details">> = ({ navigation, route }) => {
   //  ID  and isTvSeries(flag) are being recieved
   const id = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;
   console.log(id);
   const { data, isLoading } = useDetails(isTvSeries ? tvSeriesURL : moviesURL, id);

   // Watch Movie / Series
   const OpenURL = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
      else Alert.alert(`Don't know how to open this URL: ${url}`);
   };

   useEffect(() => {
      navigation.setOptions({
         title: isTvSeries ? "TV Series" : "Movie",
      });
   }, []);

   if (isLoading) {
      return (
         <LoaderContainer>
            <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
         </LoaderContainer>
      );
   }

   return (
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
                  <Date>{getYear(data?.first_air_date) || getYear(data?.release_date)}</Date>
                  <PGRating>{data.adult ? "A 18+" : "U/A 13+"}</PGRating>
                  <SeasonOrRunTime>{`${data?.seasons?.length} seasons` || `${data?.runtime}m`}</SeasonOrRunTime>
               </FlexColumn>
            </Column>
         </Header>
         <Overview>{data.overview}</Overview>
         <WatchNowBtn onPress={() => OpenURL(data.homepage)}>
            <IonIcons name="play" size={20} color={BLACK_COLOR} />
            <BtnText>Watch Now</BtnText>
         </WatchNowBtn>
         <WatchLaterbtn>
            <BtnText>Add to Watch Later</BtnText>
         </WatchLaterbtn>
      </Container>
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
   color: ${(props) => props.theme.textColor};
   font-size: 26px;
   font-weight: 600;
   width: 80%;
`;

const Date = styled.Text`
   color: ${YELLOW_COLOR};
   font-weight: 600;
`;

const PGRating = styled.Text`
   color: rgba(255, 255, 255, 0.6);
   font-weight: 600;
`;

const SeasonOrRunTime = styled.Text`
   color: rgba(255, 255, 255, 0.6);
   font-weight: 600;
`;

const Overview = styled.Text`
   color: ${(props) => props.theme.textColor};
   margin: 30px 20px;
`;

const WatchNowBtn = styled.TouchableOpacity`
   background-color: ${YELLOW_COLOR};
   padding: 10px;
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
   font-size: 18px;
`;

const WatchLaterbtn = styled.TouchableOpacity`
   background-color: ${WHITE_COLOR};
   padding: 10px;
   margin: 20px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   width: 90%;
   align-self: center;
`;
