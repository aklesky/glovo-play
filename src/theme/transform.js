import { css } from 'styled-components';

export const transform = css`
  transform: translate3d(0,0,0);
  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);
  &:hover {
    transform: scale(1.02);
  }
`;
