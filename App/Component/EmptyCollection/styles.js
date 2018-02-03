import { StyleSheet } from 'react-native';
import { Colors, Fonts } from 'Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundIcon: {
    height: 150,
    width: 200,
    resizeMode: 'contain',
  },
  text: {
    color: Colors.grey,
  },
  subText: {
    alignItems: 'center',
  },
  headerSubText: {
    fontSize: Fonts.size.h5,
  },
  descriptionText: { fontSize: Fonts.medium, marginTop: 10 },
});
