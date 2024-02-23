import { useContext, createContext, useState, PropsWithChildren } from "react";
import { useMovieSearch, useTvSearch } from "../api/search";

type SearchContextType = {
   searchTerm: string;
   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
   onSubmit: () => void;
};

const SearchContext = createContext<SearchContextType>({
   searchTerm: "",
   onSubmit: () => {},
   setSearchTerm: () => {},
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   const { refetch: refetchTv } = useMovieSearch(searchTerm);
   const { refetch: refetchMovies } = useTvSearch(searchTerm);

   const onSubmit = () => {
      if (searchTerm === "") return;
      refetchMovies();
      refetchTv();
   };

   return <SearchContext.Provider value={{ setSearchTerm, searchTerm, onSubmit }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
   return useContext(SearchContext);
};
