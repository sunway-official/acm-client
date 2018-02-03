import { StyleSheet } from 'react-native';
import { Colors, Metrics } from 'Theme/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  containerStyle: { marginBottom: Metrics.baseMargin },
  buttonContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
  },
  hintContainer: {
    borderWidth: 0.5,
    borderColor: Colors.red,
    backgroundColor: Colors.lightDeepOrange,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  hintText: { color: Colors.black },
  formContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
  },
  descriptionText: { marginTop: Metrics.baseMargin },
  actionButton: {
    borderWidth: 0.5,
    borderRadius: Metrics.buttonCornerRadius,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  actionText: { color: Colors.white, textAlign: 'center' },
  errorText: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    color: Colors.lightDeepOrange,
  },
  loadingContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
  },
});

export default styles;
