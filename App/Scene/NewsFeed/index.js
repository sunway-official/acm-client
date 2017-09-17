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
import { Colors, Images } from '~/Theme';

import Dialog from '~/Component/Dialog';
import FilterModal from '~/Component/FilterModal';
import TouchableView from '~/Component/TouchableView';

const text = ['Welcome to News Feed!', 'We are under developement.'];

class NewsFeedScene extends Component {
  render() {
    const { home } = this.props;

    return (
      <View style={styles.container}>
        <Button
          title="Hide navigation"
          onPress={() => {
            this.props.toggleHeader();
            this.props.toggleFooter();
          }}
        />
        <View style={styles.centerText}>
          {text.map((text, index) =>
            <Text key={index}>
              {text}
            </Text>,
          )}
        </View>
        <Button title="Home" onPress={home} />
        <Dialog
          visible={true}
          header={'Are you sure?'}
          headerImage={Images.smile}
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
          buttonClick={
            <View>
              <Text>Show Dialog</Text>
            </View>
          }
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
