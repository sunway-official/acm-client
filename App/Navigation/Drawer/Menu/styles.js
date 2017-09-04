import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../../Theme';
import { Constants } from 'expo';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    paddingTop: Constants.statusBarHeight,
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
  name: {
    fontWeight: Fonts.type.bold,
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
  dropdownButton: {
    margin: 'auto',
    color: Colors.white,
  },
});
