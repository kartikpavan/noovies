import { styled } from "styled-components/native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDetails } from "../api/details";
import { ActivityIndicator } from "react-native";
import { YELLOW_COLOR } from "../utils/colors";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils/helper";

const moviesURL = "https://api.themoviedb.org/3/movie/";
const tvSeriesURL = "https://api.themoviedb.org/3/tv/";

const Details: React.FC<NativeStackScreenProps<any, "Details">> = ({ navigation, route }) => {
   //  ID , title and isTvSeries(flag) are being recieved
   const title = route.params?.title;
   const id = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;

   const { data, isLoading } = useDetails(isTvSeries ? tvSeriesURL : moviesURL, id);

   useEffect(() => {
      navigation.setOptions({
         title: title,
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
         <Poster imgUrl={makeImgPath(data.poster_path)} />
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
