import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

const { size } = Fonts;
const { doubleBaseMargin, baseMargin, smallMargin } = Metrics;
const { primary, grey, white, lightBlack } = Colors;
const BACKGROUND_IMAGE_HEIGHT = 200;

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
  backgroundImage: {
    minHeight: BACKGROUND_IMAGE_HEIGHT,
    position: 'relative',
  },
  backgroundInfo: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: doubleBaseMargin,
    paddingBottom: baseMargin,
  },
  backgroundText: {
    color: Colors.white,
    fontSize: size.h6,
  },
  infoWithIconSection: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: baseMargin,
  },
  infoContainer: {
    minHeight: 400,
    backgroundColor: Colors.white,
    paddingBottom: baseMargin,
    paddingHorizontal: doubleBaseMargin,
  },
  infoSection: {
    paddingVertical: baseMargin,
  },
  iconContainerStyle: {
    flex: 1,
    alignItems: 'center',
    paddingRight: doubleBaseMargin,
  },
  text: {
    flex: 11,
  },
  primaryText: {
    color: primary,
  },
  secondaryText: {
    color: grey,
  },
  lastRow: {
    marginBottom: 0,
  },
  title: {
    fontSize: size.regular,
    marginBottom: smallMargin,
  },
  coOrganizer: { flexDirection: 'row', marginBottom: baseMargin },
  coOrganizerName: { flex: 5, color: lightBlack },
  coOrganizerInfo: {
    flex: 7,
    flexDirection: 'column',
    paddingLeft: doubleBaseMargin,
  },
  timeContainer: { flexDirection: 'column' },
  mapViewContainer: {
    marginBottom: 0,
  },
  customText: {
    color: lightBlack,
  },
});
