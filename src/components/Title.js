import styled from 'styled-components';

export const Title = styled.h1`
  margin: ${props => props.theme.metrics.margin}px ${props => props.theme.metrics.marginVertical}px;
  padding: ${props => props.theme.metrics.padding}px;
  margin-block-start: ${props => props.theme.metrics.marginVertical}px;
  margin-block-end: ${props => props.theme.metrics.marginVertical}px;
  width: calc(100% - ${props => props.theme.metrics.margin}px);
`;
