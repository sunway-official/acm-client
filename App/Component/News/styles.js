import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

const { baseMargin, doubleBaseMargin, smallMargin } = Metrics;
const { white, grey } = Colors;

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    padding: baseMargin,
    paddingBottom: 0,
    marginBottom: baseMargin,
  },
  newsContentContainer: {
    paddingVertical: baseMargin,
  },
  newsContentText: {
    fontSize: Fonts.size.medium,
  },
  newshightLightContentText: {
    fontSize: Fonts.size.h5,
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
    marginRight: baseMargin,
  },
  username: {
    fontSize: doubleBaseMargin,
  },
  secondaryText: {
    color: grey,
    fontSize: Fonts.size.small,
  },
  interactionBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: baseMargin,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.045)',
  },
  interaction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: smallMargin,
  },

  // PhotoView
  // ! one image
  singleCoverImage: {
    resizeMode: 'cover',
    minHeight: 200,
    marginVertical: baseMargin,
  },
  // ! second images
  secondImageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  secondImageView: {
    flex: 2,
    resizeMode: 'cover',
    minHeight: 200,
    margin: 2,
  },
  // ! third images
  thirdImageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thirdImageCoverContainer: {
    flex: 2,
  },
  thirdCoverImage: {
    resizeMode: 'cover',
    minHeight: 202,
    margin: 2,
  },
  thirdImageSubContainer: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 200,
    margin: 2,
  },
  smallImageTop: {
    resizeMode: 'cover',
    minHeight: 100,
  },
  smallImageBottom: {
    resizeMode: 'cover',
    minHeight: 100,
    marginTop: 2,
  },
  backdropView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    minHeight: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textAboveBackdropView: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});
