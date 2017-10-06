import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, TouchableView } from '~/Component';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';

/**
 * This Component built only for demo
 * so that there will be many things that is not correct
 * change anything if you want to override
 */

class ItemDetail extends Component {
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
    const { title, time, shortDescription } = this.props;
    return (
      <View>
        <View style={[styles.itemWrapper]}>
          <View style={styles.itemInfo}>
            <Text style={[styles.itemText]} bold>
              {title}
            </Text>
            <Text style={[styles.itemText]}>
              {time}
            </Text>
            <Text style={[styles.itemText]}>
              {shortDescription}
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
        {this.state.track ||
          <TouchableView
            rippleColor={Colors.white}
            style={styles.blurWrapper}
            onPress={() => setTimeout(this._setTrackingState, 300)}
          />}
      </View>
    );
  }
}

ItemDetail.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  shortDescription: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ItemDetail;
