import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../Theme';

const Body = StyleSheet.create({
  container: {
    // flex: 1,
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
  numberStyle: {
    fontSize: Fonts.size.h6,
  },
  secondaryText: {
    color: Colors.grey,
    fontSize: Fonts.size.small,
  },
});

export default Body;
