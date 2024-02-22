import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl } from "react-native";
import { Movie } from "../utils/types";
import { YELLOW_COLOR } from "../utils/colors";
import SingleSlide from "../components/SingleSlide";
import LargeCard from "../components/LargeCard";
import Card from "../components/Card";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const nowPlayingMoviesUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN";
const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=IN";
const popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN";

const options = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization:
         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2FkNjg5ZTdiYzJiYWFhMGFmYWIyN2YwN2U5YTJkZiIsInN1YiI6IjYyOThmYTNhNTUwN2U5MTQ5NzUxNzkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rIROP3lPUi5RlqNXsq9rlhF7XjF54semvN-q8UtisfY",
   },
};

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation }) => {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [refreshing, setRefreshing] = useState<boolean>(false);

   const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
   const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
   const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

   const fetch_now_playing = async () => {
      try {
         const response = await fetch(nowPlayingMoviesUrl, options);
         const json = await response.json();
         setNowPlayingMovies(json.results);
      } catch (error) {
         if (error instanceof Error) console.log(error.message);
      }
   };

   const fetch_upcoming = async () => {
      try {
         const response = await fetch(upcomingMoviesUrl, options);
         const json = await response.json();
         setUpcomingMovies(json.results);
      } catch (error) {
         if (error instanceof Error) console.log(error.message);
      }
   };

   const fetch_popular = async () => {
      try {
         const response = await fetch(popularMoviesUrl, options);
         const json = await response.json();
         setPopularMovies(json.results);
      } catch (error) {
         if (error instanceof Error) console.log(error.message);
      }
   };

   const fetchData = async () => {
      // Wait for all the data to load
      await Promise.all([fetch_now_playing(), fetch_upcoming(), fetch_popular()]);
      setIsLoading(false);
   };
   const onRefresh = async () => {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   if (isLoading) {
      return (
         <LoaderContainer>
            <ActivityIndicator />
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
                     minDistanceForAction={0.2}
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
                     {nowPlayingMovies?.slice(0, 5)?.map((movie) => {
                        return <SingleSlide key={movie.id} movie={movie} />;
                     })}
                  </Swiper>
               </SwiperContainer>
               {/* Trending Movies Flatlist */}
               <TrendingMoviesContainer>
                  <TrendingListTitle>Trending Movies</TrendingListTitle>
                  <FlatList
                     data={popularMovies}
                     renderItem={({ item }) => <Card movie={item} />}
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
