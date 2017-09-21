import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  // Filter styles
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardModalContainer: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: Metrics.buttonCornerRadius,
    borderWidth: 0.5,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionHeaderText: { fontSize: Fonts.small },
  headerText: { fontSize: Fonts.h6 },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
  },
  sortByContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  descriptionSortByContainer: {
    alignItems: 'center',
  },
  itemSortByContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  itemSortByText: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: Colors.lightGrey,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: Fonts.small,
    color: Colors.grey,
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deepOrange,
    height: 50,
  },
  actionSubmitText: { color: Colors.white, fontSize: Fonts.h6 },
});

export default styles;
