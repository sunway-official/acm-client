import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import { View, Image } from 'react-native';
import { Text } from '~/Component';
import { achievements } from '~/Scene/Profile/fixture';
import styles from './styles';
import query from '~/Graphql/query/me.graphql';

class About extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
    }),
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
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.description}>
            {item.shortDescription}
          </Text>
        </View>
      </View>
    );
  }

  _renderUserInformation() {
    const { data: { me } } = this.props;
    return (
      <View style={styles.information}>
        <Text>
          {me.lastname} {me.firstname}
        </Text>
        <Text>
          {me.email}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View>
          <Text>Edit herer</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Information</Text>
          </View>
          {this._renderUserInformation()}
        </View>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>Achievements</Text>
              <Text style={styles.description}>You have 15 out of 27</Text>
            </View>
            <Text>View All</Text>
          </View>
          <View>
            {achievements.map((achievements, index) =>
              this._renderItem(achievements, index),
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default graphql(gql(query))(About);
