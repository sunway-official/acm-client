import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  // Filter styles
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
  },
  actionText: {
    color: Colors.deepOrange,
    fontSize: Fonts.size.regular,
  },

  // Content Filter styles
  filterContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderLeftWidth: 8,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
  },
  filterContentIcon: { justifyContent: 'center' },
});

export default styles;
