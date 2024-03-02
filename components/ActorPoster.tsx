import React from "react";
import styled from "styled-components/native";

const ActorPoster = ({ imgUrl }: { imgUrl: string }) => {
   return <PosterImage source={{ uri: imgUrl }} />;
};

export default ActorPoster;

const PosterImage = styled.Image`
   width: 80px;
   height: 80px;
   border-radius: 40px;
   object-fit: cover;
`;
