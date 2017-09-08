import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { Colors } from '~/Theme';

class PeopleScene extends Component {
  static header = {
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

  static footer = {
    show: true,
    activeColor: Colors.green,
  };

  static propTypes = {
    home: PropTypes.func,
  };

  render() {
    const text = ['Welcome to People!', 'We are under developement.'];
    return (
      <View style={styles.container}>
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button color={Colors.green} title="Home" onPress={this.props.home} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(PeopleScene);
