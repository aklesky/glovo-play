import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkTo = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.primary};
  &:visited, &:hover, &:visited {
    color: ${props => props.theme.colors.primary};
  }
`
