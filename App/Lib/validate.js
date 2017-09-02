import constants from './constants';

export const required = value => (value ? undefined : 'This field is required');

export const email = value =>
  value && !constants.EMAIL_REGEX.test(value)
    ? 'Please enter a valid email address'
    : undefined;

export const password = value =>
  value && !constants.PASSWORD_REGEX.test(value)
    ? 'Please enter a valid password'
    : undefined;

export const minValue = min => value =>
  value && value < min ? `Use at least ${min}` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Use ${min} characters or more` : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Use ${max} characters or less` : undefined;
