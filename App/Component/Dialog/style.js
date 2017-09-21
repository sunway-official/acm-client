import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

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
    borderRadius: 15,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 10,
    color: 'black',
    fontSize: Fonts.size.regular,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  contentText: {
    color: 'black',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  actionButton: {
    paddingHorizontal: 30,
  },
  actionText: {
    color: Colors.deepOrange,
    fontSize: Fonts.size.regular,
  },
});
