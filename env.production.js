export default {
  SERVER_ENDPOINT: 'https://acm-server.herokuapp.com/graphql',
  SERVER_SUBSCRIPTION_ENDPOINT: 'ws://35.200.147.201:65080/subscriptions',
  DATE_FORMAT: 'DD/MM/YYYY',

  S3_ACCESS_KEY: '',
  S3_SECRET_KEY: '',
  S3_BUCKET_NAME: 'sunway-acm-dev',
  S3_BUCKET_REGION: 'ap-southeast-1',
  S3_GET_PREFIX: 'https://s3-<BUCKET_REGION>.amazonaws.com/<BUCKET_NAME>/',

  PAPER_REVIEW_URL: 'http://acm-admin.herokuapp.com/conference/papers',
};
