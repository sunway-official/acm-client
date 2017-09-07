import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../Theme/';

var width = Dimensions.get('window').width; //full width

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
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    paddingHorizontal: 30,
    marginTop: 12,
  },
  sendButton: {
    height: 36,
    borderRadius: 2,
    backgroundColor: Colors.darkDeepOrange,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.6,
  },
  backButton: {
    height: 36,
    borderRadius: 2,
    backgroundColor: Colors.darkDeepOrange,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.6,
    marginLeft: 10,
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
