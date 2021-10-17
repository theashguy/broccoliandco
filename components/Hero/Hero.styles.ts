import styled from "styled-components";

const Container = styled.div`
  flex-grow: 1;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.padding.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url("sam-hojati-M4hazNIyTsk-unsplash.jpg");
  background-size: cover;
  background-position: center bottom;
  color: white;

  text-align: center;

  z-index: ${({ theme }) => theme.layers.base};
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);
`;

const Inner = styled.div`
  z-index: ${({ theme }) => theme.layers.base + 1};
`;

export default { Container, Mask, Inner };
