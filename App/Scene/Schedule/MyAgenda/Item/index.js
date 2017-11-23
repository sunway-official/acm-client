import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Text } from '~/Component';
import moment from 'moment';
import ItemDetail from './Detail';
import styles from './styles';
import { Colors } from '~/Theme';
import { Icon } from 'react-native-elements';
import {
  dateComparison,
  timeComparison,
} from '~/Transformer/schedules/dateComparison';

const DEFAULT_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-blank-circle-outline',
  color: Colors.default,
  size: 15,
};

const ACTIVE_ITEM_ICON = {
  type: 'font-awesome',
  name: 'dot-circle-o',
  color: Colors.primary,
  size: 17,
};

class MyAgendaItem extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    return <ItemDetail detail={item} />;
  }

  render() {
    const { activities, date } = this.props;
    const momentDate = moment(new Date(date));
    const day = momentDate.format('D');
    const stringDay = momentDate.format('ddd');
    const comparison = dateComparison(date);

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.contentContainer,
            comparison === -1 ? styles.blurItem : null,
          ]}
        >
          <View style={styles.contentDate}>
            <Text
              style={[
                styles.textDay,
                comparison === 0 ? styles.todayDayInner : null,
              ]}
            >
              {day}
            </Text>
            <Text
              style={[
                styles.textMonth,
                comparison === 0 ? styles.todayDayInner : null,
              ]}
            >
              {stringDay}
            </Text>
          </View>

          <View style={styles.lineWrapper}>
            <View style={styles.circleBackground}>
              {comparison === 0 ? (
                <Icon {...ACTIVE_ITEM_ICON} />
              ) : (
                <Icon {...DEFAULT_ITEM_ICON} />
              )}
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <FlatList
              data={timeComparison(activities)}
              keyExtractor={(item, index) => index}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}

MyAgendaItem.propTypes = {
  activities: PropTypes.array,
  date: PropTypes.any,
};

export default MyAgendaItem;
