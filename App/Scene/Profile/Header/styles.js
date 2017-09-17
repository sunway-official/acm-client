import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../../Theme';

const { smallMargin, doubleBaseMargin, baseMargin, icons, circle } = Metrics;
const avatarWidth = 120;
const halfHeightOfAvatar = avatarWidth / 2;

export default StyleSheet.create({
  container: {
    // marginTop: 60,
  },
  centerScale: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeView: {
    height: circle.height,
    position: 'relative',
  },
  coverPhoto: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: doubleBaseMargin,
    marginTop: -halfHeightOfAvatar,
  },
  avatar: {
    width: avatarWidth,
    height: avatarWidth,
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: halfHeightOfAvatar,
    resizeMode: 'cover',
  },
  icon: {
    width: icons.large,
    height: icons.large,
    borderRadius: icons.large / 2,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: smallMargin,
    marginBottom: doubleBaseMargin,
  },
  username: {
    fontSize: Fonts.size.h6,
  },
});
