export interface Movie {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

export interface TV_Series {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   first_air_date: string;
   name: string;
   vote_average: number;
   vote_count: number;
}

export interface MediaItem {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date?: string;
   title?: string;
   video?: boolean;
   original_title?: string;
   origin_country?: string[];
   original_name?: string;
   first_air_date?: string;
   name?: string;
}

export interface RootStackParamList {
   Details: {
      title: string;
      id: number;
   };
   [key: string]: any; // Adding index signature for type 'string'
}
