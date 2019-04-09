import styled from 'styled-components';
import { elevation } from '@/theme/elevation';

export const Header = styled.header`
  background: ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.metrics.padding}px;
  ${elevation}
`;
