import { ServerStyleSheet } from 'styled-components'

export const withStyledComponents = app => renderToNodeStream => {
  const sheet = new ServerStyleSheet();
  const jsx = sheet.collectStyles(app);

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
  return stream;
}
