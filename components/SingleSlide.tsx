import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Movie } from "../utils/types";
import { makeImgPath } from "../utils/helper";
import { BlurView } from "expo-blur";

type Props = { movie: Movie };

const SingleSlide = ({ movie }: Props) => {
   const isDarkMode = useColorScheme() === "dark";
   return (
      <View key={movie.id}>
         <BgImage source={{ uri: makeImgPath(movie.backdrop_path) }} style={StyleSheet.absoluteFill} />
         <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={30}
            tint={isDarkMode ? "dark" : "default"}
            style={StyleSheet.absoluteFill}>
            <Wrapper>
               <PosterImage source={{ uri: makeImgPath(movie.poster_path) }} />
               <Column>
                  <Title>{movie.original_title}</Title>
                  <Rating>🎬 {movie.vote_average.toFixed(1)}/10</Rating>
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

const Wrapper = styled.View`
   flex-direction: row;
   height: 100%;
   justify-content: center;
   align-items: center;
`;

const Column = styled.View`
   width: 60%;
   margin-left: 15px;
`;

const PosterImage = styled.Image`
   width: 100px;
   height: 160px;
   border-radius: 10px;
`;

const Title = styled.Text`
   font-size: 18px;
   color: white;
   font-weight: 600;
   letter-spacing: 0.5px;
`;

const Description = styled.Text`
   color: rgba(255, 255, 255, 0.7);
`;

const Rating = styled(Description)`
   color: rgba(255, 255, 255, 0.7);
   margin-top: 5px;
   margin-bottom: 5px;
   font-weight: 500;
`;
