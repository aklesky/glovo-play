import styled from 'styled-components';

export const Input = styled.input`
  padding: ${props => props.theme.metrics.margin}px;
  width: calc(100% - ${props => props.theme.metrics.margin * 2}px);
  display: block;
  border: none;
  &::placeholder {
    color: ${props => props.theme.colors.gray100};
  }
  border-radius: 2px;
`;
