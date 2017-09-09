import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, FlatList } from 'react-native';
import { Text } from '~/Component';

const data = [
  {
    title: 'Title 1',
    shortDescription: 'something',
    image:
      'https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/4.png?x34982',
  },
  {
    title: 'Title 2',
    shortDescription: 'something',
    image:
      'https://conference.eurostarsoftwaretesting.com/wp-content/uploads/host-event-icon.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 3',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
  {
    title: 'Title 4',
    shortDescription: 'something',
    image:
      'http://www.adamscraftycreations.com/wp-content/uploads/2016/04/icon-special-events.png',
  },
];

class About extends Component {
  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(item, index) {
    return (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginBottom: 1,
          backgroundColor: 'white',
        }}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, marginRight: 16 }}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text bold style={{ fontSize: 16 }}>
            {item.title}
          </Text>
          <Text style={{ color: 'grey' }}>
            {item.shortDescription}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          marginTop: 8,
          marginHorizontal: 8,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 1,
            padding: 8,
            backgroundColor: 'white',
          }}
        >
          <View>
            <Text bold style={{ fontSize: 16 }}>
              Achievements
            </Text>
            <Text style={{ color: 'grey' }}>You have 15 out of 27</Text>
          </View>
          <Text bold>View All</Text>
        </View>
        <View>
          {data.map((item, index) => this._renderItem(item, index))}
        </View>
      </View>
    );
  }
}

export default About;
