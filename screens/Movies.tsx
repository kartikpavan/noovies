import styled from "styled-components/native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl } from "react-native";
import { YELLOW_COLOR } from "../utils/colors";
import SingleSlide from "../components/SingleSlide";
import LargeCard from "../components/LargeCard";
import Card from "../components/Card";
import { useMovies } from "../api/movies";
import { useQueryClient } from "react-query";
import { nowPlayingMoviesUrl, popularMoviesUrl, upcomingMoviesUrl } from "../utils/constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
   const queryClient = useQueryClient();
   const {
      data: nowPlayingMovies,
      isLoading: nowPlayingMoviesLoading,
      isRefetching: isRefetchingNowPlaying,
   } = useMovies(nowPlayingMoviesUrl);
   const {
      data: popularMovies,
      isLoading: popularMoviesLoading,
      isRefetching: isRefetchingPopular,
   } = useMovies(popularMoviesUrl);
   const {
      data: upcomingMovies,
      isLoading: upcomingMoviesLoading,
      isRefetching: isRefetchingUpcoming,
   } = useMovies(upcomingMoviesUrl);

   const onRefresh = async () => {
      await queryClient.refetchQueries(["movies"]);
   };

   const refreshing = isRefetchingNowPlaying || isRefetchingPopular || isRefetchingUpcoming;

   if (nowPlayingMoviesLoading || popularMoviesLoading || upcomingMoviesLoading) {
      return (
         <LoaderContainer>
            <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
         </LoaderContainer>
      );
   }

   return (
      <FlatList
         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         // header component will render the image swiper
         ListHeaderComponent={() => (
            <>
               <SwiperContainer>
                  <Swiper
                     loop={true}
                     timeout={4}
                     springConfig={{ speed: 10, bounciness: 0 }}
                     gesturesEnabled={() => true}
                     minDistanceToCapture={5}
                     minDistanceForAction={0.15}
                     controlsProps={{
                        dotsPos: "bottom",
                        nextPos: false,
                        prevPos: false,
                        dotsTouchable: true,
                        dotProps: {
                           badgeStyle: { height: 5, width: 5, backgroundColor: "rgba(255,255,255,0.1)" },
                        },
                        dotsWrapperStyle: { paddingTop: 10 },
                        dotActiveStyle: { backgroundColor: YELLOW_COLOR, height: 5, width: 5 },
                     }}>
                     {nowPlayingMovies
                        ?.slice(5, 10)
                        .reverse()
                        .map((movie) => {
                           return <SingleSlide key={movie.id} movie={movie} />;
                        })}
                  </Swiper>
               </SwiperContainer>
               {/* Trending Movies Flatlist */}
               <TrendingMoviesContainer>
                  <TrendingListTitle>Trending Movies</TrendingListTitle>
                  <FlatList
                     data={popularMovies}
                     renderItem={({ item }) => (
                        <Card
                           id={item.id}
                           title={item.original_title}
                           poster={item.poster_path}
                           rating={item.vote_average}
                           isTvSeries={false}
                        />
                     )}
                     keyExtractor={(item) => item.id.toString()}
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{ gap: 20 }}
                  />
               </TrendingMoviesContainer>
               {/* Label for the Upcoming Movies */}
               <ListTitle>Upcoming Movies</ListTitle>
            </>
         )}
         // rendering the upcoming movies list
         data={upcomingMovies}
         renderItem={({ item }) => <LargeCard movie={item} />}
         keyExtractor={(item) => item.id.toString() + new Date().toString()}
      />
   );
};

export default Movies;

const SwiperContainer = styled.View`
   height: ${SCREEN_HEIGHT / 4}px;
`;

const LoaderContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const TrendingMoviesContainer = styled.View`
   margin-left: 20px;
`;

const TrendingListTitle = styled.Text`
   font-size: 18px;
   font-weight: 600;
   color: ${(props) => props.theme.textColor};
   margin-top: 20px;
   margin-bottom: 20px;
`;

const ListTitle = styled.Text`
   font-size: 18px;
   font-weight: 600;
   margin-left: 20px;
   margin-top: 20px;
   color: ${(props) => props.theme.textColor};
`;
