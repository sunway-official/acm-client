import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../../Theme';

const { doubleBaseMargin, baseMargin, icons, section } = Metrics;
const avatarWidth = 120;

export default StyleSheet.create({
  container: {
    // marginTop: 60,
  },
  centerScale: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeView: {
    height: 60,
    backgroundColor: Colors.black,
  },
  avatar: {
    width: avatarWidth,
    height: avatarWidth,
    borderWidth: 3,
    borderRadius: avatarWidth / 2,
    borderColor: Colors.white,
    resizeMode: 'cover',
    marginTop: -40,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: baseMargin,
  },
  icon: {
    width: icons.large,
    height: icons.large,
    borderWidth: 0.5,
    borderRadius: icons.large / 2,
    marginBottom: 5,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: baseMargin,
    marginBottom: doubleBaseMargin,
  },
  username: {
    fontSize: Fonts.size.h6,
  },
});
