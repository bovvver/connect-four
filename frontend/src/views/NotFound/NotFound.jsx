import React from "react";
import { Wrapper } from "../Main/Main.styles";
import { StyledIcon } from "../Main/Main.styles";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { Content } from "./NotFound.styles";

const NotFound = () => {
  return (
    <Wrapper>
      <StyledIcon icon={faCircleHalfStroke} />
      <Content>[404] Page Not Found.</Content>
      <Content>😥</Content>
    </Wrapper>
  );
};

export default NotFound;
