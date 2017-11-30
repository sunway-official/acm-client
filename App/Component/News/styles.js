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
  photoViewContainer: {
    flexDirection: 'row',
  },
  photoViewSubContainer: {
    flex: 1,
    marginHorizontal: baseMargin,
    maxHeight: 200,
  },
  coverSingleImage: {
    resizeMode: 'cover',
    minHeight: 200,
    marginVertical: baseMargin,
  },
  photoViewTwoImage: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: baseMargin,
  },
  firstMediumImage: {
    flex: 2,
    resizeMode: 'cover',
    minHeight: 200,
    marginRight: smallMargin,
  },
  secondMediumImage: {
    flex: 2,
    resizeMode: 'cover',
    minHeight: 200,
    marginLeft: smallMargin,
  },
  coverImage: {
    resizeMode: 'cover',
    minHeight: 200,
  },
  smallImage: {
    resizeMode: 'cover',
    minHeight: 92,
    marginBottom: baseMargin,
  },
  moreImages: {
    position: 'absolute',
    color: Colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
