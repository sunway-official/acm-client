import constants from './constants';

export const required = value => (value ? undefined : 'Required');

export const email = value =>
  value && !constants.EMAIL_REGEX.test(value)
    ? 'Invalid email address format!'
    : undefined;

export const password = value =>
  value && !constants.PASSWORD_REGEX.test(value)
    ? 'Invalid password format!'
    : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
