import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  container: {
    margin: doubleBaseMargin,
  },
});
