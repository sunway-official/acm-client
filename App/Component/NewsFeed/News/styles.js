import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../Theme';

const { baseMargin, doubleBaseMargin, screenWidth } = Metrics;
const { white, grey } = Colors;
const photoHeight = screenWidth / 1.8; // (screenWidth / (photoWidth / photoHeight))

const Activities = StyleSheet.create({
  container: {
    backgroundColor: white,
    padding: baseMargin,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: baseMargin,
  },
  avatar: {
    marginRight: doubleBaseMargin,
  },
  username: {
    fontSize: doubleBaseMargin,
  },
  secondaryText: {
    color: grey,
    fontSize: Fonts.size.small,
  },
  photo: {
    width: '100%',
    height: photoHeight,
    resizeMode: 'contain',
    marginVertical: baseMargin,
  },
  interactionBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Activities;
