import { styled } from "styled-components/native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useReviews } from "../api/details";
import { moviesURL, tvSeriesURL } from "../utils/constants";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ActivityIndicator, FlatList } from "react-native";
import { BLACK_COLOR, DARK_GREY, WHITE_COLOR, YELLOW_COLOR } from "../utils/colors";
import Rating from "../components/Rating";
import moment from "moment";

const Reviews: React.FC<NativeStackScreenProps<any, "Reviews">> = ({ route }) => {
   const itemId = route.params?.id;
   const isTvSeries = route.params?.isTvSeries;

   const { data: reviews, isLoading } = useReviews(isTvSeries ? tvSeriesURL : moviesURL, itemId);

   if (isLoading) {
      return (
         <LoaderContainer>
            <ActivityIndicator size={"large"} color={YELLOW_COLOR} />
         </LoaderContainer>
      );
   }

   return (
      <>
         {reviews?.length === 0 ? (
            <MainContainer>
               <Text style={{ color: WHITE_COLOR, fontSize: 20 }}>No Reviews</Text>
            </MainContainer>
         ) : (
            <FlatList
               style={{ backgroundColor: BLACK_COLOR }}
               data={reviews}
               keyExtractor={(item, idx) => `${item.id}-${idx}`}
               renderItem={({ item }) => (
                  <ReviewContainer>
                     <ReviewHeader>
                        <IonIcons name="person" size={30} color="white" />
                        <FlexColumn>
                           <Author>{item.author}</Author>
                           {item.author_details?.rating && (
                              <Rating movieRating={item?.author_details?.rating} />
                           )}
                        </FlexColumn>
                     </ReviewHeader>
                     <Review>{item.content}</Review>
                     <Time>{moment(item.created_at).fromNow()}</Time>
                  </ReviewContainer>
               )}
            />
         )}
      </>
   );
};

export default Reviews;

const LoaderContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
   background-color: ${(props) => props.theme.mainBgColor};
`;

const MainContainer = styled.View`
   flex: 1;
   align-items: center;
   padding: 0px 20px;
   justify-content: center;
   background-color: ${(props) => props.theme.mainBgColor};
`;

const ReviewContainer = styled.View`
   padding: 20px;
`;

const ReviewHeader = styled.View`
   flex-direction: row;
   gap: 20px;
   align-items: center;
`;

const Text = styled.Text``;

const Author = styled.Text`
   font-weight: 600;
   font-size: 16px;
   color: ${(props) => props.theme.textColor};
`;

const Review = styled.Text`
   font-size: 12px;
   color: ${DARK_GREY};
   margin-bottom: 5px;
`;

const FlexColumn = styled.View`
   flex-direction: column;
`;

const Time = styled.Text`
   font-size: 12px;
   color: ${YELLOW_COLOR};
   font-weight: 600;
`;
