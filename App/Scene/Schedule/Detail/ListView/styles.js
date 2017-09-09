import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../../Theme';

const { white } = Colors;
const { baseMargin, smallMargin } = Metrics;

const Detail = StyleSheet.create({
  container: {
    paddingHorizontal: baseMargin,
    paddingBottom: baseMargin,
    paddingTop: smallMargin,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: white,
    padding: baseMargin,
    marginBottom: smallMargin,
  },
  title: {
    fontSize: Fonts.size.regular,
  },
  icon: {
    justifyContent: 'center',
  },
});

export default Detail;
