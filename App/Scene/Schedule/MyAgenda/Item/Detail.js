import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql, gql, compose } from 'react-apollo';
import { Text, TouchableView, LoadingIndicator } from '~/Component';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { transformServerDate } from '~/Transformer';
import DELETE_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/deletePersonalSchedule.graphql';
import INSERT_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/insertPersonalSchedule.graphql';

const TRACKING_ANIMATION_DELAY = 150;

class ItemDetail extends Component {
  static propTypes = {
    detail: PropTypes.object,
    insertPersonalScheduleMutation: PropTypes.func,
    deletePersonalScheduleMutation: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      track: true,
      loading: false,
    };
    this._setTrackingState = this._setTrackingState.bind(this);
    this._renderDetail = this._renderDetail.bind(this);
    this._toggleLoading = this._toggleLoading.bind(this);
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
      try {
        /*
         * After delete an activity, list of schedules in My Agenda also remove
         * this element although it is still displaying in My Agenda until user
         * navigate to another scene (componentWillUnmount), so it cannot
         * provide schedule_id to insert again => error => the activity must be
         * stored in temporaryDetail variable to reuse.
         */
        this._toggleLoading(true);
        if (track === false) {
          this.temporaryDetail = { ...detail };
          await deletePersonalScheduleMutation({
            variables: {
              id:
                this.newTemporaryDetail === undefined
                  ? detail.id
                  : this.newTemporaryDetail.id,
            },
          });
        } else {
          const {
            data: { insertPersonalSchedule },
          } = await insertPersonalScheduleMutation({
            variables: {
              schedule_id: this.temporaryDetail.schedule_id,
            },
          });
          /**
           * Detail is null after delete, so we must copy
           * insertPersonalSchedule object to newTemporaryDetail to use for the
           * next deleting.
           */
          this.newTemporaryDetail = { ...insertPersonalSchedule };
        }
      } catch (error) {
        console.log(error);
      } finally {
        this._toggleLoading(false);
      }
    });
  }

  _renderDetail() {
    const { props: { detail }, state: { loading } } = this;
    const isBefore = detail.isBefore;
    return (
      <View>
        <View style={[styles.itemWrapper, isBefore ? styles.blurItem : null]}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemText]} bold>
              {detail.activity_title}
            </Text>
            <Text style={[styles.itemText]}>
              {transformServerDate.toLocalTime(detail.start)} -{' '}
              {transformServerDate.toLocalTime(detail.end)}
            </Text>
          </View>
          {loading ? (
            <View style={styles.itemAction}>
              <LoadingIndicator />
            </View>
          ) : (
            <TouchableView
              style={styles.itemAction}
              rippleColor={Colors.white}
              borderless
              onPress={() => {
                isBefore ? null : this._setTrackingState(detail);
              }}
            >
              <Icon
                name={this.state.track ? 'remove-red-eye' : 'restore'}
                color={Colors.black}
                size={Metrics.small}
              />
            </TouchableView>
          )}
        </View>
        {this.state.track || (
          <TouchableView
            rippleColor={Colors.white}
            style={styles.blurWrapper}
            onPress={() =>
              setTimeout(this._setTrackingState, TRACKING_ANIMATION_DELAY)
            }
          />
        )}
      </View>
    );
  }

  render() {
    return <View>{this._renderDetail()}</View>;
  }
}

export default compose(
  graphql(gql(DELETE_PERSONAL_SCHEDULE_MUTATION), {
    name: 'deletePersonalScheduleMutation',
  }),
  graphql(gql(INSERT_PERSONAL_SCHEDULE_MUTATION), {
    name: 'insertPersonalScheduleMutation',
  }),
)(ItemDetail);
