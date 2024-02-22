import { useQuery } from "react-query";
import { Movie } from "../utils/types";

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

export const useMovies = (url: string) => {
   return useQuery<Movie[]>({
      queryKey: ["movies"],
      queryFn: async () => {
         const response = await fetch(url, options);
         const data = await response.json();
         return data?.results;
      },
   });
};
