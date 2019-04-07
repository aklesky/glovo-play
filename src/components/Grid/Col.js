import styled from 'styled-components';
import { responsive } from '@/utils/responsive';

export const Column = styled.div`
  ${responsive}
  ${props =>
    props.fullHeight
      ? `@media only screen and (min-width: ${props.theme.grid.breakpoints.md}px) { height: 100%;}`
      : `height: auto;`}
`;

Column.displayName = 'Column';
