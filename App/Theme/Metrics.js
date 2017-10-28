import { Dimensions, StatusBar } from 'react-native';
import { IS_ANDROID, IS_IOS } from '~/env';

const { width, height } = Dimensions.get('window');

const metrics = {
  baseMargin: 8,
  doubleBaseMargin: 16,
  smallMargin: 4,
  largeMargin: 64,

  section: 25,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: IS_IOS ? 64 : 54,
  buttonRadius: 4,
  statusBarHeight: IS_ANDROID ? StatusBar.currentHeight : 20,
  toolBarHeight: 56,
  icons: {
    tiny: 16,
    small: 24,
    medium: 32,
    large: 48,
    xl: 64,
  },
  images: {
    small: 24,
    medium: 48,
    large: 64,
    logo: 256,
  },
  circle: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  opacity: 0.38,

  // Buttons
  buttonCornerRadius: 2,
  buttonHeight: 36,
  buttonPaddingHorizontal: 16,
};

export default metrics;
