import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  // Filter styles
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  cardModalContainer: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: Metrics.buttonCornerRadius,
    borderWidth: 0.5,
  },
  headerContainer: {
    // backgroundColor: Colors.lightGrey,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    // borderBottomWidth: 0.5,
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
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  actionText: {
    color: Colors.deepOrange,
    fontSize: 13,
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
