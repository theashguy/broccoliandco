import styled from "styled-components";
import { theme } from "theme";

const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.padding.medium};
  background: ${({ theme }) => theme.colors.base};
`;

const Logo = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  line-height: 55px;
  color: ${({ theme }) => theme.colors.header};
  font-weight: bold;

  span {
    margin-top: 0.4rem;
  }

  small {
    font-size: 0.8rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Image = styled.img`
  margin-top: -0.2rem;
`;

export default { Container, Logo, Image };
