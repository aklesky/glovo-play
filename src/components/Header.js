import styled from 'styled-components';
import { elevation } from '@/theme/elevation';

export const Header = styled.header`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.metrics.padding};
  margin: ${props => props.theme.metrics.padding};
  ${elevation}
`;
