import React from "react";

import Spinner from "components/Spinner";

import S from "./ErrorNotation.styles";

type ErrorNotationProps = {
  children: React.ReactNode;
};

const ErrorNotation = ({ children }: ErrorNotationProps) => {
  return <S.ErrorNotation>{children}</S.ErrorNotation>;
};

export default ErrorNotation;
