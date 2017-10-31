import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, TouchableView } from '~/Component';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { transformServerDate } from '~/Transformer';

/**
 * This Component built only for demo
 * so that there will be many things that is not correct
 * change anything if you want to override
 */
class ItemDetail extends Component {
  static propTypes = {
    detail: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      track: true,
    };
    this._setTrackingState = this._setTrackingState.bind(this);
  }

  _setTrackingState() {
    this.setState({ track: !this.state.track });
  }

  render() {
    const { detail } = this.props;

    return (
      <View>
        <View
          style={[
            styles.itemWrapper,
            { opacity: detail.activity.isBefore ? 0.5 : 1 },
          ]}
        >
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
            onPress={this._setTrackingState}
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
            onPress={() => setTimeout(this._setTrackingState, 300)}
          />
        )}
      </View>
    );
  }
}

export default ItemDetail;
