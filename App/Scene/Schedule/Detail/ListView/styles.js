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
    paddingHorizontal: baseMargin,
    paddingVertical: smallMargin,
    marginBottom: smallMargin,
  },
  title: {
    fontWeight: Fonts.type.bold,
  },
  icon: {
    justifyContent: 'center',
  },
});

export default Detail;
