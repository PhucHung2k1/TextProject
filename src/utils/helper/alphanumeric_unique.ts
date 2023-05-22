export const alphanumeric_unique = (): string => {
  return Math.random()
    .toString(36)
    .split('')
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    })
    .join('')
    .substr(2, 8);
};
