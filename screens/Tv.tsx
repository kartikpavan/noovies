import React from "react";
import { useTvSeries } from "../api/TvSeries";
import styled from "styled-components/native";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView } from "react-native";
import { YELLOW_COLOR } from "../utils/colors";
import { useQueryClient } from "react-query";
import { airingNowSeriesUrl, topRatedSeriesUrl, trendingSeriesUrl } from "../utils/constants";
import TvCard from "../components/TvCard";

const Tv = () => {
   const queryClient = useQueryClient();

   const {
      data: airingNowSeries,
      isLoading: airingNowSeriesLoading,
      isRefetching: isRefetchingAiring,
   } = useTvSeries(airingNowSeriesUrl, "airing");
   const {
      data: trendingSeries,
      isLoading: trendingSeriesLoading,
      isRefetching: isRefetchingTrending,
   } = useTvSeries(trendingSeriesUrl, "trending");
   const {
      data: topRatedSeries,
      isLoading: topRatedSeriesLoading,
      isRefetching: isRefetchingTopRated,
   } = useTvSeries(topRatedSeriesUrl, "topRated");

   const refreshing = isRefetchingAiring || isRefetchingTrending || isRefetchingTopRated;

   const onRefresh = async () => {
      await Promise.all([
         queryClient.refetchQueries(["tv", "trending"]),
         queryClient.refetchQueries(["tv", "airing"]),
         queryClient.refetchQueries(["tv", "topRated"]),
      ]);
   };

   if (airingNowSeriesLoading || trendingSeriesLoading || topRatedSeriesLoading) {
      return (
         <LoaderContainer>
            <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
         </LoaderContainer>
      );
   }

   return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <Container>
            <Title>Trending TV</Title>
            <FlatList
               data={trendingSeries}
               renderItem={({ item }) => (
                  <TvCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.original_name}
                     rating={item.vote_average}
                  />
               )}
               keyExtractor={(item) => item.id.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ gap: 20 }}
            />
         </Container>
         <Container>
            <Title>Airing Today</Title>
            <FlatList
               data={airingNowSeries}
               renderItem={({ item }) => (
                  <TvCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.original_name}
                     rating={item.vote_average}
                  />
               )}
               keyExtractor={(item) => item.id.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ gap: 20 }}
            />
         </Container>

         <Container>
            <Title>Top Rated </Title>
            <FlatList
               data={topRatedSeries}
               renderItem={({ item }) => (
                  <TvCard
                     id={item.id}
                     poster={item.poster_path}
                     title={item.original_name}
                     rating={item.vote_average}
                  />
               )}
               keyExtractor={(item) => item.id.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ gap: 20 }}
            />
         </Container>
      </ScrollView>
   );
};

export default Tv;

const LoaderContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const Container = styled.View`
   margin-left: 20px;
`;

const Title = styled.Text`
   font-size: 18px;
   font-weight: 600;
   color: ${(props) => props.theme.textColor};
   margin-top: 20px;
   margin-bottom: 20px;
`;
