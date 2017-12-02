import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose, gql, graphql } from 'react-apollo';
import {
  Text,
  TouchableView,
  LoadingIndicator,
  EmptyCollection,
} from '~/Component';
import { Icon } from 'react-native-elements';
import { Colors, Metrics } from '~/Theme';
import { KEY as NAVIGATION_KEY } from '~/Redux/Navigation';
import { addHeaderOptions } from '~/Redux/Toolbar/action';
import { transformServerDate, transformText } from '~/Transformer';
import { IS_IOS } from '~/env';
import AGENDA_QUERY from '~/Graphql/query/getAgenda.graphql';
import DELETE_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/deletePersonalSchedule.graphql';
import INSERT_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/insertPersonalSchedule.graphql';
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
const TRACKING_ANIMATION_DELAY = 150;
const DEFAULT_ICON_NAME = 'info-outline';

class ActivityDetailScene extends Component {
  static propTypes = {
    detail: PropTypes.object,
    setHeader: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllSchedules: PropTypes.array,
    }),
    insertPersonalScheduleMutation: PropTypes.func,
    deletePersonalScheduleMutation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      track: props.detail.track,
      loading: false,
    };

    this._renderCurrentActivityTitle = this._renderCurrentActivityTitle.bind(
      this,
    );
    this._renderDescription = this._renderDescription.bind(this);
    this._renderDetail = this._renderDetail.bind(this);
    this._renderRelatedSchedules = this._renderRelatedSchedules.bind(this);
    this._getRelatedSchedules = this._getRelatedSchedules.bind(this);
    this._toggleLoading = this._toggleLoading.bind(this);
    this._setTrackingState = this._setTrackingState.bind(this);
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

  _trimText(text) {
    if (typeof text == 'string') {
      return text && text.trim();
    }
    return '';
  }

  _toggleLoading(loading) {
    this.setState({ loading });
  }

  _setTrackingState(detail) {
    const {
      insertPersonalScheduleMutation,
      deletePersonalScheduleMutation,
    } = this.props;
    this.setState({ track: !this.state.track }, async () => {
      const { state: { track } } = this;
      const changedDetail = { ...detail, track: track };
      try {
        this._toggleLoading(true);
        // if user want to track this activity and add it into their schedules
        if ((!detail.track && track) || (changedDetail.track && track)) {
          const idToInsert =
            this.deletedActivity !== undefined
              ? this.deletedActivity.schedule_id
              : changedDetail.id;
          const {
            data: { insertPersonalSchedule },
          } = await insertPersonalScheduleMutation({
            variables: {
              schedule_id: idToInsert,
            },
          });
          this.insertedActivity = insertPersonalSchedule;
          if (changedDetail.personalSchedule) {
            changedDetail.personalSchedule.id = insertPersonalSchedule.id;
          }
        } else {
          // if user don't want to track this activity and remove it from their schedules
          const idToDelete =
            this.insertedActivity !== undefined
              ? this.insertedActivity.id
              : changedDetail.id;
          const {
            data: { deletePersonalSchedule },
          } = await deletePersonalScheduleMutation({
            variables: {
              id: changedDetail.personalSchedule
                ? changedDetail.personalSchedule.id
                : idToDelete,
            },
          });
          this.deletedActivity = deletePersonalSchedule;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this._toggleLoading(false);
      }
    });
  }

  _renderCurrentActivityTitle(detail) {
    const { track, loading } = this.state;
    return (
      <View style={styles.info}>
        <Text bold style={styles.title}>
          {detail.activity_title}
        </Text>
        {loading ? (
          <View style={styles.trackingIcon}>
            <LoadingIndicator
              size={IS_IOS ? 'small' : Metrics.icons.small + 1}
            />
          </View>
        ) : (
          <TouchableView
            style={[
              styles.trackingIcon,
              detail.isBefore && { display: 'none' },
            ]}
            borderless={true}
            rippleColor={Colors.primary}
            onPress={() => {
              setTimeout(() => {
                this._setTrackingState(detail);
              }, TRACKING_ANIMATION_DELAY);
            }}
          >
            {this._renderIcon({
              name: track ? 'check-circle' : 'radio-button-unchecked',
              color: Colors.primary,
              size: Metrics.icons.small,
            })}
          </TouchableView>
        )}
      </View>
    );
  }

  _renderDescription(description) {
    return (
      <View style={[styles.container, styles.descriptionContainer]}>
        <Text bold style={styles.title}>
          Description
        </Text>
        {this._trimText(description) == '' ? (
          <View style={styles.noContent}>
            <Text>No description</Text>
          </View>
        ) : (
          <Text style={{ lineHeight: Metrics.section }}>{description}</Text>
        )}
      </View>
    );
  }

  _renderDetail() {
    const { detail } = this.props;
    return (
      <View>
        <View style={styles.container}>
          {this._renderCurrentActivityTitle(detail)}
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
        {this._renderDescription(detail.activity_description)}
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
          <EmptyCollection
            customStyles={styles.noContent}
            iconStyles={styles.emptyIcon}
            emptyText="No related activities"
          />
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
      : { ...state[NAVIGATION_KEY].routes[index].params.detail };
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
  statusBarBackgroundColor: Colors.primary,
};

Scene.drawer = {
  disableGestures: true,
};

export default compose(
  graphql(gql(AGENDA_QUERY)),
  graphql(gql(DELETE_PERSONAL_SCHEDULE_MUTATION), {
    name: 'deletePersonalScheduleMutation',
  }),
  graphql(gql(INSERT_PERSONAL_SCHEDULE_MUTATION), {
    name: 'insertPersonalScheduleMutation',
  }),
)(Scene);
