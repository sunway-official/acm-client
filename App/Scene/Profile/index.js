import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { Colors } from '~/Theme';

class ProfileScene extends PureComponent {
  static header = {
    leftIcon: 'drawer',
    theme: 'dark',
    backgroundColor: Colors.red,
    statusBarBackgroundColor: Colors.red,
  };

  static footer = {
    show: true,
    activeColor: Colors.red,
  };

  static propTypes = {
    home: PropTypes.func,
  };

  render() {
    const text = ['Welcome to User Profile!'];
    return (
      <View style={styles.container}>
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button title="Home" color={Colors.red} onPress={this.props.home} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(ProfileScene);
