import AppEnviroments from '../env';

/**
 * Export local env
 */

// Check if App is using remote debugging
export const IS_DEBUGGING = typeof atob !== 'undefined';

/**
 * Export global env
 */

// Export all default enviroment
Object.keys(AppEnviroments).map(key => {
  switch (key) {
    default:
      module.exports[key] = AppEnviroments[key];
      break;
  }
});
