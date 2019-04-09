import { flexbox } from '@/theme/flexbox';
import styled from 'styled-components';

export const Row = styled.div`
  ${flexbox}
  flex-flow: row wrap;
  flex: 0 1 auto;
  height: ${props => (props.fullHeight ? '100%' : 'auto')};
  width: 100%;
`;

Row.displayName = 'Row';
