import styled from 'styled-components';

export const Subtitle = styled.h3`
  margin: ${props => props.theme.metrics.margin}px 0;
  padding: ${props => props.theme.metrics.padding}px;
  min-height: ${props => props.theme.metrics.article.minHeight}px;
`;
