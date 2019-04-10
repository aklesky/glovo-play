import styled from 'styled-components';
import { flexbox } from '@/theme/flexbox';

export const Text = styled.article`
  color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.metrics.paddingVertical}px
    ${props => props.theme.metrics.paddingHorizontal}px;
  ${flexbox}
  justify-content: center;
  align-items: center;
  min-height: ${props => props.theme.metrics.article.minHeight}px;
`;
