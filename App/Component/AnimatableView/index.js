import { View } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Enviroment } from '~/Theme';

let AnimatadView;

// Use View instead of AnimatableView when debugging mode is enable
if (Enviroment.isDebuggingEnabled) {
  AnimatadView = View;
} else {
  AnimatadView = AnimatableView;
}

export default AnimatadView;
