import {Dimensions, Platform} from 'react-native';
import { Constants } from 'expo';

const { width, height } = Dimensions.get('window');
const { statusBarHeight } = Constants;

// Used via Metrics.baseMargin
const metrics = {
  itemInRow: 2,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  largeMargin: 70,
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: (width < height ? height : width) - statusBarHeight,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  headerTitleMargin: 60,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;
