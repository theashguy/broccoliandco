import React from "react";
import styled from "styled-components";

enum ButtonKind {
  JumboCTA,
  FormButton,
}

const Button = styled.button`
  display: flex;
  background: orange;
  border-radius: 3px;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2rem;
  font-size: 1.1rem;

  &:disabled {
    background: lightgrey;
  }
`;

export default { Button };
