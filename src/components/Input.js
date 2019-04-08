import styled from 'styled-components';

export const Input = styled.input`
  padding: ${props => props.theme.metrics.margin};
  width: 100%;
  display:block;
  border: none;
  &::placeholder {
    color: ${props => props.theme.colors.gray100};
  }
  border-radius: 2px;
`;
