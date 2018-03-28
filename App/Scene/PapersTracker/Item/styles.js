import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

const { baseMargin, doubleBaseMargin, buttonCornerRadius } = Metrics;
const { white, grey, green, lightGrey, primary } = Colors;
const { size } = Fonts;

export default StyleSheet.create({
  papersTrackerContainer: {
    flexDirection: 'column',
    paddingHorizontal: doubleBaseMargin,
    marginVertical: baseMargin,
    backgroundColor: white,
  },
  papersTrackerWrapper: {
    flexDirection: 'row',
    paddingVertical: baseMargin * 1.25,
  },
  infoWrapper: {
    paddingLeft: doubleBaseMargin,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: grey,
  },
  moreDetailsWrapper: {
    flex: 1,
    paddingLeft: doubleBaseMargin,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailHeaderWrapper: {
    flexDirection: 'column',
  },
  detailActionsWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: lightGrey,
    padding: baseMargin,
    borderRadius: buttonCornerRadius,
    // minWidth: 30,
    // justifyContent: 'space-around',
  },
  statusTitle: {
    color: grey,
    fontSize: size.small,
  },
  statusText: {
    color: primary,
  },
  keywordsText: {
    fontSize: size.small,
    color: grey,
  },
});
