import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from 'Theme';

const { smallMargin, doubleBaseMargin, section } = Metrics;

export default StyleSheet.create({
  backgroundImage: { width: '100%', height: '100%' },
  coverPhoto: {
    backgroundColor: 'rgba(0,0,0,0.125)',
    paddingVertical: section,
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: Metrics.statusBarHeight,
    paddingHorizontal: doubleBaseMargin,
  },
  avatar: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: smallMargin,
  },
  username: {
    fontSize: Fonts.size.h6,
  },
  primaryTextColor: {
    color: Colors.white,
  },
});
