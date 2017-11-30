import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Text, TouchableView, LoadingIndicator } from '~/Component';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from '~/Theme';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { transformServerDate, transformText } from '~/Transformer';
import AGENDA_QUERY from '~/Graphql/query/getAgenda.graphql';
import styles from './styles';

const DEFAULT_ACTIVITY_DETAIL = {
  title: '',
  start: '',
  end: '',
  room: '',
  description: '',
};
const ROUTE_NAME = 'activityDetail';
const CHAR_LENGTH = 30;
const DEFAULT_ICON_NAME = 'info-outline';

class ActivityDetailScene extends Component {
  static propTypes = {
    detail: PropTypes.object,
    setHeader: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllSchedules: PropTypes.array,
    }),
  };

  constructor(props) {
    super(props);
    this._renderDetail = this._renderDetail.bind(this);
    this._renderRelatedSchedules = this._renderRelatedSchedules.bind(this);
    this._getRelatedSchedules = this._getRelatedSchedules.bind(this);
  }

  componentDidMount() {
    const { setHeader, detail } = this.props;
    setTimeout(() => {
      setHeader({
        title: transformText.reduceByCharacters(
          detail.activity_title,
          CHAR_LENGTH,
        ),
      });
    });
  }

  _convertDateTime(date) {
    return (
      transformServerDate.toLocal(date) +
      ' - ' +
      transformServerDate.toLocalTime(date)
    );
  }

  _renderIcon({
    name = DEFAULT_ICON_NAME,
    type,
    size = Metrics.doubleBaseMargin,
    color = Colors.grey,
    iconStyle,
  }) {
    return (
      <Icon
        name={name}
        type={type}
        size={size}
        color={color}
        iconStyle={iconStyle}
      />
    );
  }

  _renderDetail() {
    const { detail } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text bold style={styles.title}>
              {detail.activity_title}
            </Text>
          </View>
          <View style={styles.info}>
            <View style={styles.icon}>
              {this._renderIcon({ name: 'location', type: 'entypo' })}
            </View>
            <Text>Room: {detail.room_name}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.icon}>
              {this._renderIcon({ name: 'access-time' })}
            </View>
            <View>
              <Text>Start: {this._convertDateTime(detail.start)}</Text>
              <Text>End: {this._convertDateTime(detail.end)}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.container, styles.descriptionContainer]}>
          <Text bold style={styles.title}>
            Description
          </Text>
          {detail.activity_description === '' ? (
            <View style={styles.noContent}>
              <Text>No description</Text>
            </View>
          ) : (
            <Text style={{ lineHeight: Metrics.section }}>
              {detail.activity_description}
            </Text>
          )}
        </View>
      </View>
    );
  }

  _getRelatedSchedules() {
    const { data: { getAllSchedules }, detail } = this.props;
    let arr = [];
    getAllSchedules.map(item => {
      if (detail.activity_id === item.activity_id && detail.id !== item.id) {
        arr.push(item);
      }
    });
    return arr;
  }

  _renderScheduleBlock(schedule) {
    return (
      <View key={schedule.id} style={styles.scheduleBlock}>
        <View style={styles.timeline}>
          <View style={styles.verticalLine} />
          {this._renderIcon({
            name: 'circle-thin',
            type: 'font-awesome',
            size: 12,
            iconStyle: styles.circleIconTop,
          })}
          {this._renderIcon({
            name: 'circle-thin',
            type: 'font-awesome',
            size: 12,
            iconStyle: styles.circleIconBottom,
          })}
        </View>
        <View style={styles.time}>
          <Text>{transformServerDate.toLocalTime(schedule.start)}</Text>
          <Text>{transformServerDate.toLocalTime(schedule.end)}</Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Text>{transformServerDate.toLocal(schedule.start)}</Text>
          <Text style={styles.secondaryText}>Room: {schedule.room_name}</Text>
        </View>
        <TouchableView style={styles.trackingIcon}>
          {this._renderIcon({
            name: 'remove-red-eye',
            color: Colors.black,
            size: 22,
          })}
        </TouchableView>
      </View>
    );
  }

  _renderRelatedSchedules() {
    const { data: { loading } } = this.props;
    const schedules = this._getRelatedSchedules();
    return (
      <View style={styles.relatedSchedulesContainer}>
        <Text bold style={styles.title}>
          Related schedules
        </Text>
        {loading ? (
          <LoadingIndicator />
        ) : schedules.length === 0 ? (
          <View style={styles.noContent}>
            <Text>No related schedules</Text>
          </View>
        ) : (
          schedules.map(schedule => {
            return this._renderScheduleBlock(schedule);
          })
        )}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        {this._renderDetail()}
        {this._renderRelatedSchedules()}
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

export default graphql(gql(AGENDA_QUERY))(Scene);
