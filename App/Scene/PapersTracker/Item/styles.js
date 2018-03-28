import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

const { baseMargin, doubleBaseMargin, buttonCornerRadius } = Metrics;
const { white, grey } = Colors;
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
    marginRight: baseMargin,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailHeaderWrapper: {
    flexDirection: 'column',
  },
  detailActionsWrapper: {
    flexDirection: 'row',
    padding: baseMargin,
    borderRadius: buttonCornerRadius,
  },
  statusTitle: {
    color: grey,
    fontSize: size.small,
  },
  keywordsText: {
    fontSize: size.small,
    color: grey,
    paddingLeft: doubleBaseMargin,
  },
});
