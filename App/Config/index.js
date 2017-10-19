export { default as initApollo } from './apollo';

/**
 * Ignore yellow box
 */
console.ignoredYellowBox = [
  // SAFE: react-native 0.49.3 warning. Will be removed later.
  'Circular indeterminate `ProgressBarAndroid`',
];
