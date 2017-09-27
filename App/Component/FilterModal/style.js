import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  cardModalContainer: {
    backgroundColor: Colors.white,
    width: 320,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 2,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelHeaderText: { color: Colors.white },
  resetHeaderText: { fontSize: Fonts.size.regular, color: Colors.white },
  headerText: { fontSize: Fonts.size.h6, color: Colors.black },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    flexDirection: 'column',
  },
  sortByContainer: {
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  descriptionSortByContainer: {
    alignItems: 'flex-start',
  },
  itemSortByContainer: {
    backgroundColor: Colors.white,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  itemSortByText: {
    alignContent: 'flex-start',
    borderWidth: 0.8,
    borderRadius: Metrics.buttonCornerRadius,
    borderColor: Colors.lightGrey,
    color: Colors.grey,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    fontSize: Fonts.size.medium,
  },
  actionContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.deepOrange,
  },
  actionSubmitText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    borderColor: Colors.white,
  },
  actionText: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
  },
});

export default styles;
