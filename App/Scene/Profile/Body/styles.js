import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../Theme';

const Body = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    borderBottomWidth: 2,
  },
});

export default Body;
