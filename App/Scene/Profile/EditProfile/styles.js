import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../Theme';

const { baseMargin } = Metrics;
const { white } = Colors;

const ProfileEditing = StyleSheet.create({
  container: {
    margin: baseMargin,
    backgroundColor: white,
  },
});

export default ProfileEditing;
