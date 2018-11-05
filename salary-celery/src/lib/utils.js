export const partial = (fn, ...args) => fn.bind(null, ...args);

const _pipe = (f, g) => (...args) => g(f(...args));

export const pipe = (...fns) => fns.reduce(_pipe);

export const prettyNumber = number => {
  let num = number;
  if (num > 1000000) {
    num = `${number / 1000000}m`;
  } else if (num > 1000) {
    num = `${number / 1000}k`;
  }
  return num;
};
