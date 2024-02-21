import React from "react";
import styled from "styled-components/native";

const Poster = ({ imgUrl }: { imgUrl: string }) => {
   return <PosterImage source={{ uri: imgUrl }} />;
};

export default Poster;

const PosterImage = styled.Image`
   width: 100px;
   height: 160px;
   border-radius: 5px;
`;
