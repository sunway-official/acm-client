import env from './env';

// Insert app env to process env
process.env = {
  ...process.env,
  ...env,
};
