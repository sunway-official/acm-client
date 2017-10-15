import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { Text } from '~/Component';
import styles from './styles';

const ICON_SIZE = 18;

class About extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._renderUserInformation = this._renderUserInformation.bind(this);
  }

  _convertUTCToLocalDate(date) {
    return moment(date)
      .local()
      .format('ll');
  }

  _renderUserInformation() {
    const { user } = this.props;
    return (
      <View>
        <View style={styles.information}>
          <View>
            <Icon
              name="briefcase"
              type="entypo"
              color="#8BC34A"
              size={ICON_SIZE}
              style={styles.icon}
            />
          </View>
          <View>
            <Text>Working places</Text>
            <Text>
              {user.position} at {user.organization}
            </Text>
          </View>
        </View>
        <View style={styles.information}>
          <View>
            <Icon
              name="home-variant"
              type="material-community"
              color="#FF9800"
              size={ICON_SIZE}
              style={styles.icon}
            />
          </View>
          <View>
            <Text>Current Location</Text>
            <Text>Lives in Da Nang, Vietnam</Text>
          </View>
        </View>
        <View style={styles.information}>
          <Icon
            name="cake"
            type="entypo"
            color="#e74c3c"
            size={ICON_SIZE}
            style={styles.icon}
          />

          <Text>Born on {this._convertUTCToLocalDate(user.dob)}</Text>
        </View>
        <View style={styles.information}>
          <View>
            <Icon
              name="car"
              type="material-community"
              color="#FFEB3B"
              size={ICON_SIZE}
              style={styles.icon}
            />
          </View>
          <View>
            <Text>Personal Interests</Text>
            <Text>{user.interested_in}</Text>
          </View>
        </View>
        <View style={styles.information}>
          <View>
            <Icon name="description" size={ICON_SIZE} style={styles.icon} />
          </View>
          <View>
            <Text>Biography</Text>
            <Text>{user.bio}</Text>
          </View>
        </View>
        <View style={styles.information}>
          <Icon
            name="clock"
            type="material-community"
            color="#607D8B"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text>Joined {this._convertUTCToLocalDate(user.created_at)}</Text>
        </View>
        <View style={styles.information}>
          <Icon
            name="wifi"
            color="#009688"
            size={ICON_SIZE}
            style={styles.icon}
          />

          <Text>Followed by 999 people</Text>
        </View>
        <View style={styles.information}>
          <View>
            <Icon
              name="facebook-box"
              type="material-community"
              color="#4267B2"
              size={ICON_SIZE}
              style={styles.icon}
            />
          </View>
          <Text>{user.facebook_id}</Text>
        </View>
        <View style={styles.information}>
          <Icon
            name="twitter"
            type="material-community"
            color="#1DA1F2"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text>{user.twitter_id}</Text>
        </View>
        <View style={styles.information}>
          <Icon
            name="linkedin-box"
            type="material-community"
            color="#0073B1"
            size={ICON_SIZE}
            style={styles.icon}
          />
          <Text>{user.linkedin_id}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <View style={styles.sectionIcon}>
              <Icon name="network" type="entypo" color="white" size={18} />
            </View>
            <View>
              <Text style={styles.title}>Intro</Text>
            </View>
          </View>
          {this._renderUserInformation()}
        </View>
      </View>
    );
  }
}

export default About;
