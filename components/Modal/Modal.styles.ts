import styled from "styled-components";

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: rgba(0, 0, 0, 0.5);
  transition: width 2s;

  z-index: ${({ theme }) => theme.layers.mask};
`;

const Clear = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: ${({ theme }) => theme.layers.mask + 1};
`;

const Panel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18rem;

  margin-left: -9.5rem;
  margin-top: -14rem;

  padding: 1rem;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  background: white;

  transition: width 2s;

  z-index: ${({ theme }) => theme.layers.mask + 2};

  h2 {
    margin-top: 0;
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  p {
    text-align: center;
    margin: 0;
  }
`;

export default { Mask, Panel, Clear };
