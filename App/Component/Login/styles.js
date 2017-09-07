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
  title: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'normal',
  },
  description: {
    fontSize: 12,
    paddingBottom: 50,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 12,
  },
  loginButton: {
    height: 36,
    backgroundColor: Colors.deepOrange,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 10,
  },
  sendButton: {
    height: 36,
    backgroundColor: Colors.deepOrange,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: Colors.deepOrange,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    marginHorizontal: 10,
  },
  buttonText: {
    borderRadius: 2,
    color: Colors.white,
    fontSize: Fonts.button,
    fontWeight: Fonts.type.bold,
  },
  footerText: {
    marginTop: 10,
    alignSelf: 'center',
    opacity: 0.38,
  },
});

export default styles;
