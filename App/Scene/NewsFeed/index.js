import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { Text } from '~/Component';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { Colors } from '~/Theme';

import Dialog from '~/Component/Dialog';

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
      header={'Are you sure?'}
      content={
        <Text
          style={{
            color: 'black',
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s
        </Text>
      }
      actions={[
        {
          name: 'TEST',
          handleSubmit: () => console.log('clicked test!'),
        },
        {
          name: 'CONFIRM',
          handleSubmit: () => console.log('clicked discard!'),
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
