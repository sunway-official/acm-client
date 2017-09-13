import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../../../Theme';

const { baseMargin, doubleBaseMargin, screenWidth } = Metrics;
const { white, grey } = Colors;
const photoHeight = screenWidth / 1.8; // (screenWidth / (photoWidth / photoHeight))

const Activity = StyleSheet.create({
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
  time: {
    color: grey,
    fontSize: Fonts.size.small,
  },
  photo: {
    width: '100%',
    height: photoHeight,
    resizeMode: 'contain',
    marginVertical: baseMargin,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Activity;
