import styled from "styled-components";
import { theme } from "theme";

const Container = styled.div`
  padding: ${({ theme }) => theme.padding.jumbo};
  background: ${({ theme }) => theme.colors.base};
  text-align: center;
  opacity: 0.5;
  font-size: 0.9rem;
`;

export default { Container };
