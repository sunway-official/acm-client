import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from 'Theme';

const { baseMargin, doubleBaseMargin, smallMargin, photoView } = Metrics;
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

  singleCoverImage: {
    minHeight: photoView.minLargeImageHeight,
    marginVertical: baseMargin,
  },
  secondImageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  secondImageView: {
    flex: 2,
    minHeight: photoView.minLargeImageHeight,
    margin: photoView.margin,
  },
  thirdImageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thirdImageCoverContainer: {
    flex: 2,
  },
  thirdCoverImage: {
    minHeight: photoView.minLargeImageHeight + photoView.margin,
    margin: photoView.margin,
  },
  thirdImageSubContainer: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: photoView.minLargeImageHeight,
    margin: photoView.margin,
  },
  thirdSmallImageTop: {
    minHeight: photoView.minSmallImageHeight,
  },
  thirdSmallImageBottom: {
    minHeight: photoView.minSmallImageHeight,
    marginTop: photoView.margin,
  },
  thirdBackdropView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    minHeight: photoView.minSmallImageHeight,
    alignContent: 'center',
    justifyContent: 'center',
  },
  thirdTextAboveBackdropView: {
    color: white,
    textAlign: 'center',
    fontSize: photoView.fontSize,
  },
});
