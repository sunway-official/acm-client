import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.largeMargin,
    paddingTop: Metrics.largeMargin,
    backgroundColor: Colors.secondaryLight,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Metrics.circle.height,
    width: Metrics.circle.width,
    borderRadius: Metrics.circle.borderRadius,
  },
  title: {
    paddingTop: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.h6,
  },
  description: {
    fontSize: Fonts.size.small,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  formContainer: {
    paddingVertical: Metrics.smallMargin,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin,
  },
  submitButton: {
    height: Metrics.buttonHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.buttonCornerRadius,
    backgroundColor: Colors.deepOrange,
    marginHorizontal: Metrics.baseMargin,
  },
  buttonText: {
    color: Colors.white,
  },
  footerText: {
    alignSelf: 'center',
    marginTop: Metrics.baseMargin,
    opacity: Metrics.opacity,
  },
  signUpText: {
    alignSelf: 'center',
    marginTop: Metrics.doubleBaseMargin,
    opacity: Metrics.opacity,
  },
});

export default styles;
