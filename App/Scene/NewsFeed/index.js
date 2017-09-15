import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button, TouchableOpacity } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { Colors } from '~/Theme';

import Dialog from '~/Component/Dialog';
import FilterModal from '~/Component/FilterModal';
import TouchableView from '~/Component/TouchableView';

const text = ['Welcome to News Feed!', 'We are under developement.'];

const NewsFeedScene = ({ home }) =>
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
  </View>;

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
};

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(NavigationActions.navigate({ routeName: 'home' })),
});

export default connect(undefined, mapDispatchToProps)(NewsFeedScene);
