import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import Fixture from '../../../fixture';
import styles from './styles';

class About extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(item, index) {
    return (
      <View key={index} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ justifyContent: 'center' }}>
          <Text bold style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.description}>
            {item.shortDescription}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.topicContainer}>
          <View>
            <Text bold style={styles.title}>
              Achievements
            </Text>
            <Text style={styles.description}>You have 15 out of 27</Text>
          </View>
          <Text bold>View All</Text>
        </View>
        <View>
          {Fixture.map((item, index) => this._renderItem(item, index))}
        </View>
      </View>
    );
  }
}

export default About;
