import React, { Component } from 'react';
import { TextInput } from 'react-native';

class AutoExpandingTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        underlineColorAndroid="transparent"
        onContentSizeChange={event => {
          this.setState({ height: event.nativeEvent.contentSize.height });
        }}
        style={[
          {
            height: Math.min(200, Math.max(35, this.state.height)),
            fontSize: 16,
            marginTop: 10,
          },
        ]}
      />
    );
  }
}

export default AutoExpandingTextInput;
