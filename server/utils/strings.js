export default {
  format: string => (...args) => {
    return args.reduce((p, c) => {
      return p.replace(/%s/, c);
    }, string);
  }
};
