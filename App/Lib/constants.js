export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const HTTP_URL_REGEX = /^(https?:)?\/\//i;

export default {
  PASSWORD_REGEX,
  EMAIL_REGEX,
  HTTP_URL_REGEX,
};
