import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import {
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET_NAME,
  S3_BUCKET_REGION,
} from '~/env';

const BASE64_PREFIX = 'data:image/png;base64,';

const S3 = new AWS.S3({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});

export const put = ({ uri, base64 }, { ...options }) => {
  return new Promise((resolve, reject) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: 'girl.' + fileType,
      Body: new Buffer(base64, 'base64'),
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

export const get = params => {
  if (params === undefined || params.Key === undefined) {
    throw "Key is required for params S3.get() \n Example: \n\t S3.get({ Key: 'Hello.jpg' })";
  }
  const { Key = undefined, ...options } = params;
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key,
      ...options,
    };
    S3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      const buffer = data.Body.toString('base64');
      resolve({
        uri: BASE64_PREFIX + buffer,
      });
    });
  });
};

export default { put, get };
