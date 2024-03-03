import { useQuery } from "react-query";
import { Movie, MovieCast, MovieDetail, Review } from "../../utils/types";

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

export const useMovieDetails = (url: string, id: string) => {
   return useQuery<MovieDetail>({
      queryKey: ["movieDetails", id],
      queryFn: async () => {
         const response = await fetch(url + id, options);
         const data = await response.json();
         return data;
      },
   });
};

export const useMovieCredits = (url: string, id: string) => {
   return useQuery<MovieCast[]>({
      queryKey: ["movieCredits", id],
      queryFn: async () => {
         const response = await fetch(url + id + "/credits", options);
         const data = await response.json();
         return data.cast;
      },
   });
};
