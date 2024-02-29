import { useQuery } from "react-query";

const options = {
   method: "GET",
   headers: {
      accept: "application/json",
      Authorization:
         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2FkNjg5ZTdiYzJiYWFhMGFmYWIyN2YwN2U5YTJkZiIsInN1YiI6IjYyOThmYTNhNTUwN2U5MTQ5NzUxNzkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rIROP3lPUi5RlqNXsq9rlhF7XjF54semvN-q8UtisfY",
   },
};

export const useDetails = (url: string, id: string) => {
   return useQuery({
      queryKey: ["details", id],
      queryFn: async () => {
         const response = await fetch(url + id, options);
         const data = await response.json();
         return data;
      },
      // enabled: false,
   });
};
