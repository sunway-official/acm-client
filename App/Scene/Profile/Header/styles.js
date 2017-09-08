import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../Theme';

export default StyleSheet.create({
  centerScale: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: Metrics.circleRadius,
    borderColor: 'white',
    resizeMode: 'cover',
    marginHorizontal: 30,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderRadius: Metrics.circleRadius,
    borderColor: 'white',
    marginBottom: 5,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  username: {
    fontSize: Fonts.size.h6,
  },
});
