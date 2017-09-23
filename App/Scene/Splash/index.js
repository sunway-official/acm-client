import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { Text } from '~/Component';
import { Images, Colors } from '~/Theme';
import styles from './styles';

const SplashScene = () =>
  <Image style={styles.container} source={Images.splash}>
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color={Colors.white} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  </Image>;

SplashScene.header = {
  disable: true,
  theme: 'light',
};

SplashScene.footer = {
  disable: true,
};

export default SplashScene;
