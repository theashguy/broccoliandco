import React from "react";

import S from "./Header.styles";

const Header = ({ children }) => {
  return (
    <S.Container>
      <S.Logo>
        <S.Image src="/logo.svg" />
        <span>
          Broccoli<small> & co</small>
        </span>
      </S.Logo>

      {/* {children} */}
    </S.Container>
  );
};

export default Header;
