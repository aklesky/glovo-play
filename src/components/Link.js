import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkTo = styled(Link)`
  display: block;
  color: ${props => props.active ? props.theme.colors.black : props.theme.colors.gray};
  &:visited,
  &:hover,
  &:visited {
    color: ${props => props.active ? props.theme.colors.black : props.theme.colors.gray};
  }
  pointer-events: ${props => (props.active ? 'auto' : 'none')};
  text-decoration: none;
  padding: ${props => props.theme.metrics.padding};
`;
