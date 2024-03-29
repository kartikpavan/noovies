import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Movie } from "../utils/types";
import { makeImgPath } from "../utils/helper";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import { YELLOW_COLOR } from "../utils/colors";

type Props = { movie: Movie };

const SingleSlide = ({ movie }: Props) => {
   const navigation = useNavigation();
   return (
      <View key={movie.id}>
         <BgImage source={{ uri: makeImgPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
         <BlurView experimentalBlurMethod="none" intensity={100} tint="dark" style={StyleSheet.absoluteFill}>
            <Wrapper
               onPress={() =>
                  // @ts-ignore
                  navigation.navigate("Stack", { screen: "MovieDetails", params: { id: movie.id } })
               }>
               <Poster imgUrl={makeImgPath(movie.poster_path)} />
               <Column>
                  <Title>{movie.original_title}</Title>
                  <Rating movieRating={movie.vote_average} />
                  <Description>{movie.overview.slice(0, 80)}...</Description>
               </Column>
            </Wrapper>
         </BlurView>
      </View>
   );
};

export default SingleSlide;

const View = styled.View`
   flex: 1;
`;

const BgImage = styled.Image``;

const Wrapper = styled.Pressable`
   flex-direction: row;
   height: 100%;
   justify-content: center;
   align-items: center;
`;

const Column = styled.View`
   width: 60%;
   margin-left: 15px;
`;

const Title = styled.Text`
   font-size: 18px;
   color: ${YELLOW_COLOR};
   font-weight: 600;
   letter-spacing: 0.5px;
`;

const Description = styled.Text`
   color: rgba(255, 255, 255, 0.7);
`;
