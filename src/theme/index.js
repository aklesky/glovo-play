import { colors } from './colors'

export const theme = {
  colors,
  grid: {
    gutterWidth: 1,
    size: 12,
    breakpoints: {
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
    }
  },
  metrics: {
    padding: 5,
    margin: 10,
    marginVertical: 15,
    paddingVertical: 10,
    store: {
      minHeight: 200,
      maxHeight: 300,
    }
  }
}
