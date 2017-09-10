import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { Colors } from '~/Theme';

const text = ['Welcome to People!', 'We are under developement.'];

const PeopleScene = ({ home }) =>
  <View style={styles.container}>
    <View style={styles.centerText}>
      {text.map((text, index) =>
        <Text key={index}>
          {text}
        </Text>,
      )}
    </View>
    <Button color={Colors.green} title="Home" onPress={home} />
  </View>;

PeopleScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.green,
  statusBarBackgroundColor: Colors.green,
  actions: [
    {
      icon: {},
      onPress: () => {
        console.log('hello people');
      },
    },
  ],
};

PeopleScene.footer = {
  show: true,
  activeColor: Colors.green,
};

PeopleScene.propTypes = {
  home: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(PeopleScene);
