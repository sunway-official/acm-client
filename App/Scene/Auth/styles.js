import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '~/Theme/';

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
    backgroundColor: Colors.primary,
    marginHorizontal: Metrics.baseMargin,
  },
  disabledSubmitButton: {
    height: Metrics.buttonHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.buttonCornerRadius,
    backgroundColor: Colors.blueGrey,
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
    // borderTopWidth: 1,
    // borderColor: Colors.danger,
    paddingTop: 5,
  },
});

export default styles;
