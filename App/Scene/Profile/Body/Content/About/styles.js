import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    padding: baseMargin,
    paddingVertical: doubleBaseMargin,
    backgroundColor: white,
    alignItems: 'center',
  },
  sectionIcon: {
    backgroundColor: Colors.blue,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    marginLeft: baseMargin,
  },
  title: {
    fontSize: size.h6,
    marginLeft: baseMargin,
  },
  description: {
    color: grey,
    fontSize: Fonts.size.small,
  },
  information: {
    flexDirection: 'row',
    padding: baseMargin,
    backgroundColor: white,
  },
  icon: {
    marginLeft: baseMargin,
    marginRight: doubleBaseMargin,
  },
});
