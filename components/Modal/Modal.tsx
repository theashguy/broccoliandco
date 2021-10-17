import React from "react";

import S from "./Modal.styles";

type ModalProps = {
  children: React.ReactNode;
  onDismiss: Function;
};

const Modal = ({ children, onDismiss }) => {
  return (
    <S.Mask>
      <S.Clear onClick={() => onDismiss()} />
      <S.Panel>{children}</S.Panel>
    </S.Mask>
  );
};

export default Modal;
