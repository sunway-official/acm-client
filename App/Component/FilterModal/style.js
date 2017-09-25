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
    width: 300,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionHeaderText: { fontSize: Fonts.size.medium },
  headerText: { fontSize: Fonts.size.regular },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    height: 300,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
  },
  sortByContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  descriptionSortByContainer: {
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: Fonts.size.small,
  },
  itemSortByContainer: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.buttonCornerRadius,
    marginRight: 5,
    marginBottom: 10,
  },
  itemSortByText: {
    alignContent: 'center',
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: Colors.lightGrey,
    color: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Fonts.size.small,
  },
  actionContainer: {
    alignItems: 'center',
    backgroundColor: Colors.deepOrange,
    height: Metrics.buttonHeight,
    justifyContent: 'center',
  },
  actionSubmitText: { color: Colors.white, fontSize: Fonts.h6 },
});

export default styles;
