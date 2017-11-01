import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 45,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundIcon: {
    height: 150,
    width: 200,
  },
  subText: {
    alignItems: 'center',
  },
  headerSubText: {
    fontSize: 25,
  },
  descriptionText: { fontSize: 14, marginTop: 10 },
});

export default styles;
