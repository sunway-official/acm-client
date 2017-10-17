import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { IS_DEBUGGING } from '~/env';

let AnimatadView;

// Use View instead of AnimatableView when debugging mode is enable
if (IS_DEBUGGING) {
  AnimatadView = View;
} else {
  AnimatadView = AnimatableView;
}

export default AnimatadView;
