import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Text, TouchableView } from '~/Component';
import styles from './styles';
import { randomBackground } from './fixtures';
import { transformText } from '~/Transformer';

class ConferenceItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shortenDescription: true,
    };
  }

  componentWillMount() {
    this.uri = randomBackground();
  }

  render() {
    const { title, description } = this.props;
    return (
      <Image
        style={styles.background}
        source={{
          uri: this.uri,
        }}
        resizeMode={'cover'}
      >
        <TouchableView style={styles.container} rippleColor={'white'}>
          <TouchableView
            style={styles.infoContainer}
            onPress={() =>
              this.setState(prevState => ({
                shortenDescription: !prevState.shortenDescription,
              }))}
          >
            <Text style={[styles.text, styles.titleText]} bold>
              {title}
            </Text>
            <Text style={[styles.text, styles.descriptionText]}>
              {this.state.shortenDescription
                ? transformText.reduceByWords(description)
                : description}
            </Text>
          </TouchableView>
        </TouchableView>
      </Image>
    );
  }
}

ConferenceItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ConferenceItem;
