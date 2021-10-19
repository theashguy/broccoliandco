import React from "react";

import S from "./Spinner.styles";

/* Spinner thanks to SpinKit: https://tobiasahlin.com/spinkit/ */

const Spinner = () => {
  return (
    <S.Container>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </S.Container>
  );
};

export default Spinner;
