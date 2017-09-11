import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../../Theme';

const { white } = Colors;
const { baseMargin, smallMargin, doubleBaseMargin } = Metrics;

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
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    marginBottom: 1,
  },
  title: {
    fontSize: Fonts.size.regular,
  },
  icon: {
    justifyContent: 'center',
  },
});

export default Detail;
