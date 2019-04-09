import styled from 'styled-components';

export const Tag = styled.span`
  display: inline-block;
  background: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.white};
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`;
