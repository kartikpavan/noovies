import { useQuery } from "react-query";
import { Movie, TV_Series } from "../../utils/types";

const options = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization:
         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2FkNjg5ZTdiYzJiYWFhMGFmYWIyN2YwN2U5YTJkZiIsInN1YiI6IjYyOThmYTNhNTUwN2U5MTQ5NzUxNzkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rIROP3lPUi5RlqNXsq9rlhF7XjF54semvN-q8UtisfY",
   },
};

export const useMovieSearch = (query: string, page: number = 1) => {
   return useQuery<Movie[]>({
      queryKey: ["movieSearch", query + "movie"],
      queryFn: async () => {
         const searchURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
         const response = await fetch(searchURL, options);
         const data = await response.json();
         return data.results;
      },
      enabled: false,
   });
};

export const useTvSearch = (query: string, page: number = 1) => {
   return useQuery<TV_Series[]>({
      queryKey: ["tvSearch", query + "tv"],
      queryFn: async () => {
         const searchURL = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`;
         const response = await fetch(searchURL, options);
         const data = await response.json();
         return data.results;
      },
      enabled: false,
   });
};
