import styled from 'styled-components';

export const PlayerNameStyled = styled.h2`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  margin: 5px 0 0 0;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.black};
`;
