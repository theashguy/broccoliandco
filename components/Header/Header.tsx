import React from "react";

import GithubCorner from "react-github-corner";

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

      <GithubCorner
        href={"https://github.com/theashguy/broccoliandco"}
        bannerColor={"#ffa500"}
        size={60}
      />
    </S.Container>
  );
};

export default Header;
