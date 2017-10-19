import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '~/Theme';

const statusBarMargin = Metrics.doubleBaseMargin * -1;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    // paddingTop: Constants.statusBarHeight,
    height: Metrics.statusBarHeight,
    backgroundColor: Colors.transparent,
    marginHorizontal: statusBarMargin,
  },
  headerContainer: {
    position: 'relative',
  },
  headerBackground: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  headerInfo: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
  },
  headerImage: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin,
    flexDirection: 'row',
  },
  profileImage: {
    width: Metrics.images.large,
    height: Metrics.images.large,
    borderRadius: Metrics.images.large / 2,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  conferenceImage: {
    width: Metrics.images.medium,
    height: Metrics.images.medium,
    borderRadius: Metrics.images.medium / 2,
    marginLeft: 'auto',
  },
  line: {
    flexDirection: 'row',
  },
  text: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
    backgroundColor: 'transparent',
  },
  dropdownButtonWrapper: {
    position: 'absolute',
    right: Metrics.baseMargin,
    bottom: Metrics.baseMargin,
  },
  dropdownButtonTouchableView: {
    padding: Metrics.baseMargin,
  },
  bodyContainer: {
    paddingTop: Metrics.baseMargin,
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuItem: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: Metrics.icons.large,
    flexDirection: 'row',
  },
  menuItemActive: {
    backgroundColor: Colors.lightGrey,
  },
  menuItemIconWrapper: {
    width: Metrics.icons.xl,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuItemNameWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemNameText: {
    fontSize: Fonts.size.regular,
    color: Colors.darkGrey,
  },
  menuItemNameTextActive: {
    // fontWeight: Fonts.type.bold,
  },
});
