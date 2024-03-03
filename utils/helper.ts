export const makeImgPath = (imgURL: string, width: string = "w500"): string => {
   return `https://image.tmdb.org/t/p/${width}${imgURL}`;
};

export const getYear = (date: string): string => {
   return date.split("-")[0];
};

export const convertToUrl = (id: string, type: "tv" | "movie"): string => {
   return `https://netfilm.app/watch/${type}/${id}`;
};
