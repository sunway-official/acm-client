import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  // Filter styles
  container: {
    alignItems: 'center',
    flex: 1,
  },
  cardModalContainer: {
    backgroundColor: 'white',
    borderRadius: Metrics.buttonCornerRadius,
    borderWidth: 0.5,
    width: 320,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.deepOrange,
    elevation: 2,
    opacity: 0.8,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelHeaderText: { color: Colors.white, paddingRight: Metrics.baseMargin },
  resetHeaderText: { fontSize: Fonts.size.regular, color: Colors.white },
  headerText: { fontSize: Fonts.size.h6, color: Colors.white },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    height: 350,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    alignItems: 'center',
    backgroundColor: Colors.deepOrange,
    height: Metrics.buttonHeight * 1.2,
    justifyContent: 'center',
  },
  actionSubmitText: { color: Colors.white, fontSize: Fonts.h6 },
});

export default styles;
