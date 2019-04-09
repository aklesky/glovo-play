import styled from 'styled-components';

export const Grid = styled.section`
  width: 100%;
  margin: 0 auto;
  height: ${props => (props.fullHeight ? '100%' : 'auto')};
`;

Grid.displayName = 'Grid';
