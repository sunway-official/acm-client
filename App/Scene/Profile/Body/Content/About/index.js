import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import { ACHIEVEMENTS } from '~/Scene/Profile/fixture';
import styles from './styles';

class About extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._renderUserInformation = this._renderUserInformation.bind(this);
  }

  _renderItem(item, index) {
    return (
      <View key={index} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.shortDescription}</Text>
        </View>
      </View>
    );
  }

  _renderUserInformation() {
    const { user } = this.props;
    return (
      <View style={styles.information}>
        <Text>
          {user.lastname} {user.firstname}
        </Text>
        <Text>{user.email}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Information</Text>
          </View>
          {this._renderUserInformation()}
        </View>
        {/*
          <View style={styles.section}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>Achievements</Text>
              <Text style={styles.description}>You have 15 out of 27</Text>
            </View>
            <Text style={styles.description}>View All</Text>
          </View>
          <View>
            {ACHIEVEMENTS.map((ACHIEVEMENTS, index) =>
              this._renderItem(ACHIEVEMENTS, index),
            )}
          </View>
        </View>
        */}
      </View>
    );
  }
}

export default About;
