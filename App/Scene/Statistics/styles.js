import { StyleSheet } from 'react-native';
import { Metrics, Colors } from 'Theme';

export default StyleSheet.create({
  container: {
    padding: Metrics.doubleBaseMargin,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Metrics.baseMargin,
  },
  categoryItem: { width: '40%', margin: Metrics.doubleBaseMargin },
  categoryButton: {
    borderRadius: 10,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.white,
  },
  categoryLabel: {
    marginTop: Metrics.baseMargin,
    textAlign: 'center',
  },
});
