import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

const { white, grey } = Colors;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    marginTop: Metrics.statusBarHeight,
  },
  header: {
    flexShrink: 1,
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.075)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  headerGroup: {
    padding: Metrics.baseMargin,
  },
  headerText: {
    fontSize: Fonts.size.regular,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: white,
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  contentUserInformation: {
    flexDirection: 'row',
  },
  contentUsername: {
    marginLeft: Metrics.baseMargin,
  },
  actions: {
    flexShrink: 1,
    height: Metrics.navBarHeight,
    backgroundColor: white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.075)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: Fonts.size.small,
    color: grey,
  },
  imagesContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageUploaded: {
    width: 120,
    height: 120,
    marginLeft: 4,
  },
  textInput: {
    marginVertical: Metrics.baseMargin,
  },
});
