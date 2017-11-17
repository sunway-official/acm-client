import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, Image } from 'react-native';
import { ImagePicker } from 'expo';
import { S3 } from '~/Provider';
import { S3Image } from '~/Component';
import { S3_GET_PREFIX } from '~/env';
import { Colors } from '~/Theme';
import styles from './styles';

/*
  Amazon S3 Provider example
*/
class HomeScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: 'girl.jpg',
    };
    this._handleImagePicker = this._handleImagePicker.bind(this);
  }

  async _handleImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true, // Required. S3 need base64 source
    });

    if (!result.cancelled) {
      const { uri, base64 } = result;
      const { Key } = await S3.putAsync({ uri, base64 });
      this.setState({ image: Key });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Pick image to Submit to S3"
          color={Colors.primary}
          onPress={this._handleImagePicker}
        />
        <View marginBottom={24} />
        {/*
          S3Image use for GET private Object
        */}
        <S3Image
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
          Key={this.state.image}
        />
        <View marginBottom={24} />
        {/*
          Image use for GET public Object
        */}
        <Image
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
          source={{
            uri: S3_GET_PREFIX + this.state.image,
          }}
        />
      </View>
    );
  }
}
HomeScene.drawer = {
  primary: true,
};

HomeScene.header = {
  leftIcon: 'drawer',
  float: true,
  title: null,
  theme: 'dark',
  backgroundColor: Colors.primary,
  statusBarBackgroundColor: Colors.primary,
  actions: [
    {
      icon: {
        name: 'lock',
      },
      onPress: dispatch => {
        dispatch({
          type: 'LOCK_ACTION',
          payload: 'Lock the account',
        });
      },
    },
  ],
};

HomeScene.propTypes = {
  showSearch: PropTypes.func,
  hideSearch: PropTypes.func,
};

export default HomeScene;
