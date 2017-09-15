import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import { addHeaderOptions, toggleHeader } from '~/Redux/Toolbar/action';
import styles from './styles';
import { Colors } from '~/Theme';

const text = ['Welcome to News Feed!', 'We are under developement.'];

class NewsFeedScene extends PureComponent {
  componentDidMount() {
    this.props.setTitle('Old feed');
    // console.log('start hiding');
    // setTimeout(() => {
    //   console.log('triggered');
    //   this.props.toggleHeader();
    // }, 2000);
  }

  render() {
    const { home } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button title="Home" onPress={home} />
      </View>
    );
  }
}

NewsFeedScene.header = {
  leftIcon: 'drawer',
  theme: 'dark',
  backgroundColor: Colors.blue,
  statusBarBackgroundColor: Colors.blue,
  actions: [
    {
      icon: {},
      onPress: () => {
        console.log('hello there');
      },
    },
  ],
};

NewsFeedScene.footer = {
  show: true,
  activeColor: Colors.blue,
};

NewsFeedScene.propTypes = {
  home: PropTypes.func,
  setTitle: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
  setTitle: title => dispatch(addHeaderOptions({ title })),
  toggleHeader: () => dispatch(toggleHeader()),
});

export default connect(undefined, mapDispatchToProps)(NewsFeedScene);
