import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Theme/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 50,
    backgroundColor: Colors.secondaryLight,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 150,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  button: {
    height: 36,
    marginTop: 12,
    borderRadius: 2,
    backgroundColor: Colors.darkDeepOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Fonts.button,
    fontWeight: Fonts.type.bold,
  },
  footerText: {
    marginTop: 5,
    alignSelf: 'center',
    opacity: 0.38,
  },
});

export default styles;
