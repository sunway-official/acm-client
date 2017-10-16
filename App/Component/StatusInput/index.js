import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import { Colors } from '~/Theme';
import { UserAvatar, TouchableView, Text } from '~/Component';

import { defaultUserAvatar } from '~/Scene/NewsFeed/fixture';

class StatusInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.post = this.post.bind(this);
  }

  post() {
    this.props.post(this.state.text);
    this.textInput.clear();
    this.textInput.blur();
  }

  render() {
    return (
      <View style={styles.container}>
        <UserAvatar small avatar={defaultUserAvatar} />
        <TouchableView
          rippleColor={Colors.secondary}
          style={styles.statusBoxView}
        >
          <TextInput
            ref={ref => {
              this.textInput = ref;
            }}
            onChangeText={text => this.setState({ text })}
            style={[styles.placeholderStyle]}
            placeholder="What's on your mind?"
            underlineColorAndroid="transparent"
          />
        </TouchableView>
        <TouchableOpacity>
          <Icon name="camera" type="material-community" />
        </TouchableOpacity>
        <TouchableView rippleColor={Colors.primary} onPress={this.post}>
          <Text>Post</Text>
        </TouchableView>
      </View>
    );
  }
}

StatusInput.propTypes = {
  post: PropTypes.func.isRequired,
};

export default StatusInput;
