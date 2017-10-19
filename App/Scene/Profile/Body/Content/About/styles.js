import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  container: {
    marginBottom: baseMargin,
  },
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
  infoContainer: {
    flexDirection: 'row',
    padding: baseMargin,
    backgroundColor: white,
  },
  info: {
    flex: 1,
  },
  icon: {
    marginLeft: baseMargin,
    marginRight: doubleBaseMargin,
  },
});
