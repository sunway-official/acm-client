import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    margin: baseMargin,
    paddingTop: baseMargin,
    paddingHorizontal: baseMargin,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: baseMargin,
  },
  descriptionContainer: {
    padding: baseMargin,
    marginTop: 0,
  },
  title: {
    fontSize: size.regular,
  },
  icon: {
    marginRight: doubleBaseMargin,
    marginLeft: baseMargin,
    alignItems: 'center',
  },
});
