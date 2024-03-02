import styled from "styled-components/native";
import { ICast } from "../utils/types";
import { makeImgPath } from "../utils/helper";
import { YELLOW_COLOR } from "../utils/colors";
import ActorPoster from "./ActorPoster";

type CastProps = {
   cast: ICast;
};

const CastCard = ({ cast }: CastProps) => {
   return (
      <Container>
         <ActorPoster imgUrl={makeImgPath(cast.profile_path)} />
         <Title>
            {cast.name}
            {`\n`}
            <Span> as </Span>
            {`\n`}
            {cast.character}
         </Title>
      </Container>
   );
};

export default CastCard;

const Container = styled.View`
   width: 110px;
   align-items: center;
`;

const Title = styled.Text`
   color: ${(props) => props.theme.textColor};
   font-weight: 400;
   text-align: center;
   font-size: 12px;
   margin-top: 5px;
`;

const Span = styled.Text`
   color: ${YELLOW_COLOR};
   font-weight: 500;
`;
