import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 50,
    backgroundColor: 'white',
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
  textInput: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: '#ECF0F3',
  },
  button: {
    height: 36,
    marginTop: 12,
    borderRadius: 2,
    backgroundColor: '#dc4405',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 5,
    alignSelf: 'center',
    color: '#000000',
    opacity: 0.38,
  },
  warningText: {
    color: 'orange',
    fontSize: 12,
    borderTopWidth: 1,
    borderColor: 'orange',
    paddingTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    borderTopWidth: 1,
    borderColor: '#dc4405',
    paddingTop: 5,
  },
});

export default styles;
