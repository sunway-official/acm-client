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
});

export default styles;
