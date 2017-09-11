import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from '~/Component';
import styles from './styles';

class Activity extends Component {
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postHeader}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri:
                  'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png',
              }}
              style={styles.avatar}
            />
            <View>
              <Text bold style={styles.username}>
                Dung Le
              </Text>
              <Text style={styles.time}>5 minutes ago</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="chevron-down" type="material-community" />
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            I have attended this conference and learned more things from that.
          </Text>
          <Image
            source={{
              uri:
                'http://3oohwq3ybklb1b1ri41mvgfo.wpengine.netdna-cdn.com/wp-content/uploads/Conference-Past-w.jpg',
            }}
            style={styles.photo}
          />
          <View style={styles.interactionContainer}>
            <Icon name="comment" type="evilicon" />
            <Icon name="heart" type="material-community" />
          </View>
        </View>
      </View>
    );
  }
}

export default Activity;
