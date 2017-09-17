import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../../../Theme';

const { baseMargin, doubleBaseMargin } = Metrics;
const { white, grey } = Colors;

const About = StyleSheet.create({
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    padding: baseMargin,
    backgroundColor: white,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: doubleBaseMargin,
  },
  title: {
    fontSize: 16,
  },
  description: {
    color: grey,
    fontSize: Fonts.size.small,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: doubleBaseMargin,
    paddingVertical: baseMargin,
    marginBottom: 1,
    backgroundColor: white,
  },
});

export default About;
