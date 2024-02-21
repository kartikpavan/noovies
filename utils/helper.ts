export const makeImgPath = (imgURL: string, width: string = "w500"): string => {
   return `https://image.tmdb.org/t/p/${width}${imgURL}`;
};
