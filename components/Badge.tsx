import React from "react";
import { styled } from "styled-components/native";

const Badge = ({ children }: { children: React.ReactNode | string }) => {
   return <View>{children}</View>;
};
export default Badge;

const View = styled.View`
   border: 1px solid ${(props) => props.theme.textColor};
   padding: 2px 6px;
`;

const Text = styled.Text``;
