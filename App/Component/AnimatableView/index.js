import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';

let AnimatadView;

// Use View instead of AnimatableView when debugging mode is enable
if (process.env.IS_DEBUGGING) {
  AnimatadView = View;
} else {
  AnimatadView = AnimatableView;
}

export default AnimatadView;
