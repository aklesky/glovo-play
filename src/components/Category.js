import styled from 'styled-components';
import { elevation } from '@/theme/elevation';
import { flexbox } from '@/theme/flexbox';

export const Category = styled.section`
  ${flexbox};
  text-align: center;
  background: ${props =>
    props.active ? props.theme.colors.secondary : props.theme.colors.gray100};
  ${props =>
    !props.fullWidth &&`
      margin: ${props.theme.metrics.margin}px;
      padding: ${props.theme.metrics.padding}px;
  `}
  ${props =>
    props.paddingVertical &&
    `padding-top: ${props.paddingVertical}px; padding-bottom: ${props.paddingVertical}px;`}
  ${props =>
    props.paddingHorizontal &&
    `padding-left: ${props.paddingHorizontal}px; padding-right: ${props.paddingHorizontal}px;`}
  ${props =>
    props.marginVertical &&
    `margin-top: ${props.marginVertical}px; margin-bottom: ${props.marginVertical}px;`}
  ${props =>
    props.marginHorizontal &&
    `margin-left: ${props.marginHorizontal}px; margin-right: ${props.marginHorizontal}px;`}

  word-wrap: break-word;
  overflow-wrap: break-word;
  ${elevation};
`;
