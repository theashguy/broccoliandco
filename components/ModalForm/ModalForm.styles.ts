import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding.small};

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    span {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    input {
      border: 1px solid lightgrey;
      padding: ${({ theme }) => parseInt(theme.padding.medium) * 0.9}rem
        ${({ theme }) => theme.padding.medium};
      font-size: 1.2rem;
      border-radius: 3px;
      width: 15rem;
    }
  }
`;

export default { Container };
