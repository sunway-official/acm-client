import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
});

export default styles;
