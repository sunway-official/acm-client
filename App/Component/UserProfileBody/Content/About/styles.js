import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from 'Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey, primary } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  container: {
    marginBottom: baseMargin,
  },
  reviewContainer: {
    backgroundColor: 'white',
    paddingHorizontal: baseMargin,
    paddingVertical: baseMargin,
    marginBottom: baseMargin,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTitle: { color: grey, fontWeight: 'bold' },
  reviewTextBoxContainer: { width: '100%', marginBottom: doubleBaseMargin },
  ratingSubmitBtn: {
    backgroundColor: primary,
    paddingVertical: baseMargin,
    paddingHorizontal: doubleBaseMargin,
  },
  ratingSubmitTitle: {
    // fontWeight: 'bold',
    color: white,
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: baseMargin,
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
  rating: {
    flex: 1,
    alignItems: 'center',
  },
});
