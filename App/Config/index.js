import env from './env';

console.log(process.env);

process.env = {
  ...process.env,
  ...env,
};

console.log(process.env);
