import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from '~/Component';
import { Icon } from 'react-native-elements';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { transformServerDate, transformText } from '~/Transformer';

const DEFAULT_ACTIVITY_DETAIL = {
  title: '',
  start: '',
  end: '',
  room: '',
  description: '',
};

const ROUTE_NAME = 'activityDetail';

class ActivityDetailScene extends Component {
  static propTypes = {
    detail: PropTypes.object,
    setHeader: PropTypes.func,
  };

  _convertDateTime(date) {
    return (
      transformServerDate.toLocal(date) +
      ' - ' +
      transformServerDate.toLocalTime(date)
    );
  }

  componentDidMount() {
    const { setHeader, detail } = this.props;
    setTimeout(() => {
      setHeader({
        title: transformText.reduceByWords(detail.activity_title, 6),
      });
    });
  }

  render() {
    const { detail } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text bold style={styles.title}>
              {detail.activity_title}
            </Text>
          </View>
          <View style={styles.info}>
            <View style={styles.icon}>
              <Icon
                name="location"
                type="entypo"
                size={Metrics.doubleBaseMargin}
                color={Colors.grey}
              />
            </View>
            <Text>Room: {detail.room_name}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.icon}>
              <Icon
                name="access-time"
                size={Metrics.doubleBaseMargin}
                color={Colors.grey}
              />
            </View>
            <View>
              <View>
                <Text>Start: {this._convertDateTime(detail.start)} </Text>
              </View>
              <View>
                <Text>End: {this._convertDateTime(detail.end)} </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.container, styles.descriptionContainer]}>
          <Text bold style={styles.title}>
            Description
          </Text>
          <Text style={{ lineHeight: Metrics.section }}>
            {detail.activity_description}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  // Get route index
  const index = state[NAVIGATION_KEY].index;
  const routeName = state[NAVIGATION_KEY].routes[index].routeName;
  let data =
    routeName !== ROUTE_NAME
      ? { ...DEFAULT_ACTIVITY_DETAIL }
      : {
          ...state[NAVIGATION_KEY].routes[index].params.detail,
        };
  return {
    detail: data,
  };
};

const mapDispatchToProps = dispatch => ({
  setHeader: options => dispatch(addHeaderOptions(options)),
});

const Scene = connect(mapStateToProps, mapDispatchToProps)(ActivityDetailScene);

Scene.header = {
  leftIcon: 'back',
  theme: 'dark',
};

Scene.drawer = {
  disableGestures: true,
};

export default Scene;
