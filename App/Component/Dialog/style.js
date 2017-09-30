import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Metrics } from '~/Theme/';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  cardModalContainer: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: Metrics.buttonCornerRadius,
    borderWidth: 0.5,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  headerText: {
    color: 'black',
    fontSize: Fonts.size.regular,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentText: {
    color: 'black',
  },
});
