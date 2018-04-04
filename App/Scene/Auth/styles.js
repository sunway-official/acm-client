import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from 'Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.largeMargin,
    backgroundColor: Colors.secondaryLight,
    justifyContent: 'center',
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
  buttonContainer: {
    marginTop: Metrics.doubleBaseMargin,
  },
  submitButton: {
    height: Metrics.buttonHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.buttonCornerRadius,
    backgroundColor: Colors.primary,
    marginHorizontal: Metrics.baseMargin,
  },
  loadingButton: {
    backgroundColor: Colors.grey,
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
  errorText: {
    color: Colors.danger,
    fontSize: Fonts.size.small,
    paddingTop: 5,
    paddingBottom: 5,
  },
  registerFormContainer: {
    backgroundColor: Colors.white,
    zIndex: 1,
    position: 'relative',
  },
  registerTitle: {
    marginTop: Metrics.largeMargin,
    fontSize: Fonts.size.h6,
    color: Colors.primary,
  },
  registerDescription: {
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.baseMargin,
  },
  registerField: {
    marginBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  registerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.doubleBaseMargin,
  },
  registerSubmitButton: {
    width: '70%',
  },
});

export default styles;
