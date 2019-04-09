import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  width: calc(100% - ${props => props.theme.metrics.margin}px);
  margin: 0 auto;
`;
