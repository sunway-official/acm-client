import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import styles from './styles';
import { Colors } from '~/Theme';

const text = ['Welcome to User Profile!'];

const ProfileScene = ({ home }) =>
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) =>
        <Text key={index}>
          {text}
        </Text>,
      )}
    </View>
    <Button title="Home" color={Colors.red} onPress={home} />
  </View>;

ProfileScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.red,
  statusBarBackgroundColor: Colors.red,
};

ProfileScene.footer = {
  show: true,
  activeColor: Colors.red,
};

ProfileScene.propTypes = {
  home: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(ProfileScene);
