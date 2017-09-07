import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';

class PeopleScene extends Component {
  /**
   * Header config
   */
  static header = {
    leftIcon: 'drawer',
    actions: [
      {
        icon: {},
        onPress: () => {
          console.log('hello people');
        },
      },
    ],
  };

  static propTypes = {
    login: PropTypes.func,
  };

  render() {
    const text = ['People Scene!'];
    return (
      <View style={styles.container}>
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button title="Login" onPress={this.props.login} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(NavigationActions.navigate({ routeName: 'login' })),
});

export default connect(undefined, mapDispatchToProps)(PeopleScene);
