import React from "react";

import Spinner from "components/Spinner";

import S from "./Button.styles";

type ButtonProps = {
  children: React.ReactNode;
  onClick: Function;
  autoFocus?: boolean;
  disabled?: boolean;
  working?: boolean;
};

const Button = ({
  children,
  onClick,
  autoFocus,
  disabled,
  working,
}: ButtonProps) => {
  return (
    <S.Button onClick={onClick} autoFocus={autoFocus} disabled={disabled}>
      {working ? <Spinner /> : null}
      {children}
    </S.Button>
  );
};

export default Button;
