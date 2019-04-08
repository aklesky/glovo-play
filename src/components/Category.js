import styled from 'styled-components';
import { elevation } from '@/theme/elevation';


export const Category = styled.section`
  text-align: center;
  background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.gray100};
  margin: ${props => props.theme.metrics.margin};
  padding: ${props => props.theme.metrics.padding};
  word-wrap: break-word;
  overflow-wrap: break-word;
  ${elevation};
`;
