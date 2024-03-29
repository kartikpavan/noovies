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

export interface ICast {
   adult: boolean;
   gender: number;
   id: number;
   known_for_department: string;
   name: string;
   original_name: string;
   popularity: number;
   profile_path: string;
   cast_id: number;
   character: string;
   credit_id: string;
   order: number;
}

export interface Review {
   author: string;
   author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number;
   };
   content: string;
   created_at: string;
   id: string;
   updated_at: string;
   url: string;
}

export interface MovieDetail {
   adult: boolean;
   backdrop_path: string;
   belongs_to_collection: any;
   budget: number;
   genres: { id: number; name: string }[];
   homepage: string;
   id: number;
   imdb_id: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
   }[];
   production_countries: { iso_3166_1: string; name: string }[];
   release_date: string;
   revenue: number;
   runtime: number;
   spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

export interface MovieCast {
   adult: boolean;
   gender: number;
   id: number;
   known_for_department: string;
   name: string;
   original_name: string;
   popularity: number;
   profile_path: string;
   cast_id: number;
   character: string;
   credit_id: string;
   order: number;
}

export type FavoriteItem = {
   id: string;
   title: string | undefined;
   poster_path: string | undefined;
   mediaType: "tv" | "movie";
};

export type Trailer = {
   iso_639_1: string;
   iso_3166_1: string;
   name: string;
   key: string;
   site: string;
   size: number;
   type: string;
   official: boolean;
   published_at: string;
   id: string;
};
