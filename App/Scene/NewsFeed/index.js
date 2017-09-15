import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from '~/Redux/Navigation';
import {
  addHeaderOptions,
  toggleHeader,
  toggleFooter,
} from '~/Redux/Toolbar/action';
import styles from './styles';
import { Colors } from '~/Theme';

import Dialog from '~/Component/Dialog';
import FilterModal from '~/Component/FilterModal';

const text = ['Welcome to News Feed!', 'We are under developement.'];

class NewsFeedScene extends Component {
  firstTimeout = null;
  secondTimeout = null;

  componentDidMount() {
    this.props.setTitle('Old feed');

    this.firstTimeout = setTimeout(() => {
      this.props.toggleHeader();
      this.props.toggleFooter();

      this.secondTimeout = setTimeout(() => {
        this.props.toggleHeader();
        this.props.toggleFooter();
      }, 1500);
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.firstTimeout);
    clearTimeout(this.secondTimeout);
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
        <Dialog
          isOpen={false}
          header={'Are you sure?'}
          content="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text ever
            since the 1500s"
          actions={[
            {
              name: 'Cancel',
            },
            {
              name: 'Confirm',
              handleSubmit: () => console.log('clicked discard!'),
            },
          ]}
        />

        <FilterModal
          isOpen={false}
          header={'Filter'}
          contents={[
            {
              name: 'Leadership',
            },
            {
              name: 'Program Assessment',
            },
            {
              name: 'Citizen Tech',
            },
            {
              name: 'Accreditation',
            },
          ]}
          actions={[
            {
              name: 'Cancel',
            },
            {
              name: 'Apply',
              handleSubmit: () => console.log('clicked APPLY!'),
            },
          ]}
        />
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
  toggleHeader: PropTypes.func,
  toggleFooter: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
  setTitle: title => dispatch(addHeaderOptions({ title })),
  toggleHeader: () => dispatch(toggleHeader()),
  toggleFooter: () => dispatch(toggleFooter()),
});

export default connect(undefined, mapDispatchToProps)(NewsFeedScene);
