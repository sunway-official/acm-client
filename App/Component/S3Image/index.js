import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { S3 } from '~/Provider';

/**
 * S3Image Component
 * Inherit all props from Image
 * Props:
 *  - Key: "Key from S3"
 */
class S3Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri: null,
    };

    this._setImage = this._setImage.bind(this);
  }

  async _setImage(Key) {
    const imageUri = await S3.get({ Key });
    this.setState({ imageUri });
  }

  componentDidMount() {
    const { Key } = this.props;
    this._setImage(Key);
  }

  componentWillReceiveProps(nextProps) {
    const { Key } = nextProps;
    if (Key !== this.props.Key) {
      this._setImage(Key);
    }
  }

  render() {
    return <Image source={{ uri: this.state.imageUri }} {...this.props} />;
  }
}

S3Image.propTypes = {
  Key: PropTypes.string,
};

export default S3Image;
