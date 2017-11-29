import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

class AutoExpandingTextInput extends Component {
  static propTypes = {
    maxHeight: PropTypes.number,
    style: TextInput.propTypes.style,
  };

  static defaultProps = {
    maxHeight: 200,
  };

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
          this.props.style,
          {
            height: Math.min(
              this.props.maxHeight,
              Math.max(35, this.state.height),
            ),
          },
        ]}
      />
    );
  }
}

export default AutoExpandingTextInput;
