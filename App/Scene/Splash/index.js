import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Text, LoadingIndicator } from 'Component';
import { Images, Colors } from 'Theme';
import styles from './styles';

const SplashScene = () => (
  <ImageBackground style={styles.container} source={Images.splash}>
    <View style={styles.loadingWrapper}>
      <LoadingIndicator color={Colors.white} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  </ImageBackground>
);

SplashScene.header = {
  disable: true,
  theme: 'dark',
  statusBarBackgroundColor: Colors.transparent,
};

SplashScene.footer = {
  disable: true,
};

SplashScene.drawer = {
  disableGestures: true,
};

export default SplashScene;
