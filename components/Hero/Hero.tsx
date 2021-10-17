import React from "react";

import S from "./Hero.styles";

const Hero = ({ children }) => {
  return (
    <S.Container>
      <S.Mask />
      <S.Inner>{children}</S.Inner>
    </S.Container>
  );
};

export default Hero;
