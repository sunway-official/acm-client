import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql, gql, compose } from 'react-apollo';
import { Text, TouchableView, LoadingIndicator } from '~/Component';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { transformServerDate } from '~/Transformer';
import mutation from '~/Graphql/mutation/deletePersonalSchedule.graphql';
import query from '~/Graphql/query/getMyAgenda.graphql';

class ItemDetail extends Component {
  static propTypes = {
    detail: PropTypes.object,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
    mutate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      track: true,
      id: null,
    };
    this._setTrackingState = this._setTrackingState.bind(this);
    this._renderDetail = this._renderDetail.bind(this);
  }

  async componentWillUnmount() {
    const { props: { data: { refetch }, mutate }, state: { track, id } } = this;
    if (track === false) {
      try {
        await mutate({
          variables: {
            id: id,
          },
        });
        await refetch();
      } catch (error) {
        console.log(error);
      }
    }
  }

  _setTrackingState(id) {
    this.setState({ track: !this.state.track, id: id });
  }

  _renderLoading() {
    return () => (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    );
  }

  _renderDetail() {
    const { detail } = this.props;
    const isBefore = detail.activity.isBefore;
    return (
      <View>
        <View style={[styles.itemWrapper, { opacity: isBefore ? 0.5 : 1 }]}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemText]} bold>
              {detail.activity.title}
            </Text>
            <Text style={[styles.itemText]}>
              {transformServerDate.toLocalTime(detail.schedule.start)} -{' '}
              {transformServerDate.toLocalTime(detail.schedule.end)}
            </Text>
          </View>
          <TouchableView
            style={styles.itemAction}
            rippleColor={Colors.white}
            borderless
            onPress={() => {
              isBefore ? null : this._setTrackingState(detail.id);
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
    const { data: { loading } } = this.props;
    const detail = loading ? this._renderLoading() : this._renderDetail();

    return <View>{detail}</View>;
  }
}

export default compose(graphql(gql(mutation)), graphql(gql(query)))(ItemDetail);
