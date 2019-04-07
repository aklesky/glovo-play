import styled from 'styled-components';
import { elevation } from '@/theme/elevation';

export const Stores = styled.section`
  background: ${props => props.theme.colors.pink};
  height: 100%;
  ${elevation}
`;
