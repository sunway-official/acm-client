import React from 'react';
import { View } from 'react-native-animatable';
import styles from './styles';

const ANIMATION = 'fadeIn';
const DURATION = 300;

export default Scene => {
  const FadeInWrapper = () => (
    <View style={styles.container} animation={ANIMATION} duration={DURATION}>
      {React.isValidElement(Scene) ? Scene : <Scene />}
    </View>
  );
  FadeInWrapper.displayName = `FadeInWrapper(${Scene.displayName})`;
  return FadeInWrapper;
};
