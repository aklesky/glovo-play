import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  width: 100%;
  background: ${props => props.theme.colors.background};
  font-family: Roboto, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}

html, body, #root, main {
  height: 100%;
  min-height: 100%;
}

#root {
  display: flex;
  flex-direction: column;
}
`
