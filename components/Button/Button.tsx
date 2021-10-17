import React from "react";

import Spinner from "components/Spinner";

import S from "./Button.styles";

type ButtonProps = {
  working: boolean;
  children: React.ReactNode;
  onClick: Function;
  autoFocus: boolean;
};

const Button = ({ working, children, onClick, autoFocus }: ButtonProps) => {
  return (
    <S.Button onClick={onClick} autoFocus={autoFocus}>
      {working ? <Spinner /> : null}
      {children}
    </S.Button>
  );
};

export default Button;
