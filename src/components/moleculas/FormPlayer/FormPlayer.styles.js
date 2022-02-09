import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  input {
    padding: 10px 20px;
    margin-left: 30px;
    border-radius: 7px;
    border: none;
    background-color: ${({ theme }) => theme.colors.grey};
    &::placeholder {
      opacity: 50%;
    }
  }
`;
