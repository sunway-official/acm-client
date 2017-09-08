import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '~/Theme';

const MyAgenda = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: Metrics.baseMargin,
  },
});

export default MyAgenda;
