import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Metrics, Fonts, Colors } from '~/Theme';

const IS_ANDROID = Platform.OS === 'android';

const statusBarMargin = Metrics.doubleBaseMargin * -1;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    // paddingTop: Constants.statusBarHeight,
    height: IS_ANDROID
      ? // For Android
        StatusBar.currentHeight
      : // For iOS
        Metrics.iOSStatusBarHeight,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    borderRadius: Metrics.circleRadius,
  },
  conferenceImage: {
    width: Metrics.images.medium,
    height: Metrics.images.medium,
    borderRadius: Metrics.circleRadius,
    marginLeft: 'auto',
  },
  line: {
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
  },
  dropdownButtonWrapper: {
    position: 'absolute',
    right: Metrics.baseMargin,
    bottom: Metrics.baseMargin,
    borderRadius: Metrics.circleRadius,
  },
  dropdownButtonTouchableView: {
    padding: Metrics.baseMargin,
  },
  bodyContainer: {
    paddingTop: Metrics.baseMargin,
    flex: 1,
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
    marginRight: Metrics.baseMargin,
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
