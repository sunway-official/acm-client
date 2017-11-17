import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql, gql, compose } from 'react-apollo';
import { Text, TouchableView } from '~/Component';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { transformServerDate } from '~/Transformer';
import DELETE_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/deletePersonalSchedule.graphql';
import INSERT_PERSONAL_SCHEDULE_MUTATION from '~/Graphql/mutation/insertPersonalSchedule.graphql';

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
    };
    this._setTrackingState = this._setTrackingState.bind(this);
    this._renderDetail = this._renderDetail.bind(this);
  }

  _setTrackingState(detail) {
    const {
      insertPersonalScheduleMutation,
      deletePersonalScheduleMutation,
    } = this.props;
    this.setState({ track: !this.state.track }, async () => {
      const { state: { track } } = this;
      try {
        if (track === false) {
          this.temporaryDetail = detail;
          await deletePersonalScheduleMutation({
            variables: {
              id: detail.id,
            },
          });
        } else {
          await insertPersonalScheduleMutation({
            variables: {
              schedule_id: this.temporaryDetail.schedule_id,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  _renderDetail() {
    const { detail } = this.props;
    const isBefore = detail.isBefore;
    return (
      <View>
        <View style={[styles.itemWrapper, { opacity: isBefore ? 0.5 : 1 }]}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemText]} bold>
              {detail.activity_title}
            </Text>
            <Text style={[styles.itemText]}>
              {transformServerDate.toLocalTime(detail.start)} -{' '}
              {transformServerDate.toLocalTime(detail.end)}
            </Text>
          </View>
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
        </View>
        {this.state.track || (
          <TouchableView
            rippleColor={Colors.white}
            style={styles.blurWrapper}
            onPress={() => setTimeout(this._setTrackingState, 150)}
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
