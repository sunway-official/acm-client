import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Text } from '~/Component';
import moment from 'moment';
import ItemDetail from './Detail';
import { DATE_FORMAT } from '~/env';
import styles from './styles';
import { Colors } from '~/Theme';
import { Icon } from 'react-native-elements';

const TODAY = moment().format(DATE_FORMAT);

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
    console.log('In Item: ', activities);

    // activities = activities.filter(item => item.active);
    // const month = moment(date, DATE_FORMAT).format('MMM');
    const day = moment(date, DATE_FORMAT).format('D');
    const stringDay = moment(date, DATE_FORMAT).format('ddd');
    const currentDate = moment(date, DATE_FORMAT).format(DATE_FORMAT);
    console.log('day: ', moment(date, DATE_FORMAT));
    // console.log('string day: ', stringDay);
    // console.log('current: ', currentDate);
    const isToday = TODAY == currentDate;
    const isBefore = TODAY > currentDate;
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          {/*<Text style={styles.headerTextDay} bold>
          4th
        </Text>
        <Text style={styles.headerTextDay}>April</Text>*/}
        </View>
        <View
          style={[styles.contentContainer, isBefore ? { opacity: 0.5 } : {}]}
        >
          <View style={styles.contentDate}>
            <Text style={[styles.textDay, isToday ? styles.todayDayInner : {}]}>
              {day}
            </Text>
            <Text
              style={[styles.textMonth, isToday ? styles.todayDayInner : {}]}
            >
              {stringDay}
            </Text>
          </View>
          {/**
  *          <View style={styles.contentDate}>
            <Text style={[styles.textDay, isToday ? styles.todayDayInner : {}]}>
              {transformServerDate.toLocal(date)}
            </Text>
          </View>
  */}

          <View style={styles.lineWrapper}>
            <View style={styles.circleBackground}>
              {isToday ? (
                <Icon {...ACTIVE_ITEM_ICON} />
              ) : (
                <Icon {...DEFAULT_ITEM_ICON} />
              )}
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <FlatList
              data={activities}
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
  color: PropTypes.shape({
    background: PropTypes.string,
    primary: PropTypes.string,
  }),
};

export default MyAgendaItem;
