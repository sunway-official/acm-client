import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import { Buffer } from 'buffer';
import {
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_BUCKET_REGION,
} from '~/env';
import uuid from 'uuid/v1';

const BASE64_PREFIX = 'data:image/png;base64,';

const S3 = new AWS.S3({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});

export const putAsync = ({ uri, base64, ...options }) => {
  return new Promise((resolve, reject) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: uuid() + '.' + fileType, // Generate random UUID
      Body: new Buffer(base64, 'base64'), // Tranform file to base64
      ACL: 'public-read', // By default: putObject will set file to public
      ...options,
    };

    S3.putObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve({
        Key: params.Key,
        response: data,
      });
    });
  });
};

export const getAsync = params => {
  if (params === undefined || params.Key === undefined) {
    throw new Error(
      "Key is required for params S3.getAsync() \nExample: \n\t S3.getAsync({ Key: 'Hello.jpg' })",
    );
  }
  const { Key = undefined, ...options } = params;
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key, // getObject by Key
      ...options,
    };
    S3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      const buffer = data.Body.toString('base64');
      resolve(BASE64_PREFIX + buffer);
    });
  });
};

export default { putAsync, getAsync };
