import { transformServerEndPoint } from '~/Transformer';
import { Constants } from 'expo';
import { Platform } from 'react-native';
import env from '../env';
/**
 * Export local env
 */

// Check if App is using remote debugging
export const IS_DEBUGGING = typeof atob !== 'undefined';
export const IS_DEVICE = Constants.isDevice;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

/**
 * Export global env
 */
// Export all default enviroment
Object.keys(env).map(key => {
  // console.log(key);
  switch (key) {
    case 'SERVER_ENDPOINT': {
      if (__DEV__) {
        if (IS_DEBUGGING || IS_DEVICE) {
          module.exports['SERVER_ENDPOINT'] = transformServerEndPoint(
            IS_ANDROID ? Constants.experienceUrl : Constants.linkingUrl,
          );
          break;
        }
      }
      module.exports[key] = env[key];
      break;
    }
    case 'S3_GET_PREFIX':
      module.exports['S3_GET_PREFIX'] = env[key]
        .replace(/(<BUCKET_REGION>)/, env.S3_BUCKET_REGION)
        .replace(/(<BUCKET_NAME>)/, env.S3_BUCKET_NAME);
      break;
    default:
      module.exports[key] = env[key];
      break;
  }
});
