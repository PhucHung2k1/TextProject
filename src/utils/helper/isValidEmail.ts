export const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const isValidEmail = (values: string) => {
  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i.test(values);
};
