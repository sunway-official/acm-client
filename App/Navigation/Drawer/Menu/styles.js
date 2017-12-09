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
  avatarImage: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  conferenceImageWrapper: {
    justifyContent: 'center',
    marginLeft: 'auto',
    backgroundColor: Colors.primary,
    width: Metrics.logoDrawer.width,
    height: Metrics.logoDrawer.height,
    borderRadius: Metrics.logoDrawer.width / 2,
  },
  conferenceImage: {
    width: Metrics.logoDrawer.size,
    marginLeft: 10,
    resizeMode: 'contain',
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
    marginBottom: Metrics.baseMargin,
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
