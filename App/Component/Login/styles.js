import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18,
    backgroundColor: 'white',
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19,
    marginVertical: 20,
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#dc4405',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    color: '#A6A8A9',
    fontSize: 15,
  },
});

export default styles;
