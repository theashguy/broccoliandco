import React from "react";

import S from "./ModalForm.styles";

type ModalFormProps = {
  children: React.ReactNode;
  name: String;
};

const ModalForm = ({ children, name }: ModalFormProps) => {
  return (
    <S.Container>
      <h2>{name}</h2>
      {children}
    </S.Container>
  );
};

export default ModalForm;
