import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  // Filter styles
  container: {
    alignItems: 'center',
    flex: 1,
  },
  cardModalContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: Metrics.buttonCornerRadius,
    borderWidth: 0.5,
    width: 320,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.deepOrange,
    elevation: 2,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelHeaderText: { color: Colors.white },
  resetHeaderText: { fontSize: Fonts.size.regular, color: Colors.white },
  headerText: { fontSize: Fonts.size.h6, color: Colors.white },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    // height: 320,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flexDirection: 'column',
  },
  sortByContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  descriptionSortByContainer: {
    alignItems: 'flex-start',
  },
  itemSortByContainer: {
    backgroundColor: Colors.white,
    marginRight: 5,
    marginBottom: 10,
  },
  itemSortByText: {
    alignContent: 'flex-start',
    borderWidth: 0.5,
    borderRadius: Metrics.buttonCornerRadius,
    borderColor: Colors.lightGrey,
    color: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Fonts.size.medium,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 25,
  },
  unactiveActionSubmitText: {
    // backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderRadius: 20,
    width: 70,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeActionSubmitText: {
    backgroundColor: Colors.deepOrange,
    borderRadius: 20,
    width: 70,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: Fonts.size.small,
  },
});

export default styles;
