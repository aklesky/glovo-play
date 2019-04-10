import styled from 'styled-components';
import { transform } from '@/theme/transform';

export const Tag = styled.span`
  display: inline-block;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.metrics.margin}px;
  margin: ${props => props.theme.metrics.padding}px;
  border-radius: 6px;
  text-transform: capitalize;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }

  &:hover {
    ${transform};
  }
`;
