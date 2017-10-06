import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Text } from '~/Component';
import moment from 'moment';
import ItemDetail from './Detail';
import { DATE_FORMAT } from 'react-native-dotenv';
import styles from './styles';
import { Colors, Metrics } from '~/Theme';
import { Icon } from 'react-native-elements';

const TODAY = moment().format(DATE_FORMAT);

const DEFAULT_ITEM_ICON = {
  type: 'material-community',
  name: 'checkbox-blank-circle-outline',
  color: Colors.default,
  size: 15,
};

const ACTIVE_ITEM_ICON = {
  type: 'foundation',
  name: 'ticket',
  color: Colors.primary,
  size: 15,
};

const MyAgendaItem = ({ activities, date, color }) => {
  activities = activities.filter(item => item.active);
  // const month = moment(date, DATE_FORMAT).format('MMM');
  const day = moment(date, DATE_FORMAT).format('D');
  const stringDay = moment(date, DATE_FORMAT).format('ddd');
  const currentDate = moment(date, DATE_FORMAT).format(DATE_FORMAT);
  const isToday = TODAY == currentDate;

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {/*<Text style={styles.headerTextDay} bold>
          4th
        </Text>
        <Text style={styles.headerTextDay}>April</Text>*/}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentDate}>
          <Text style={[styles.textDay, isToday ? styles.todayDayInner : {}]}>
            {day}
          </Text>
          <Text style={[styles.textMonth, isToday ? styles.todayDayInner : {}]}>
            {stringDay}
          </Text>
        </View>

        <View style={styles.lineWrapper}>
          <View style={styles.circleBackground}>
            {isToday
              ? <Icon {...ACTIVE_ITEM_ICON} />
              : <Icon {...DEFAULT_ITEM_ICON} />}
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <FlatList
            data={activities}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) =>
              <ItemDetail {...item} backgroundColor={color.background} />}
          />
        </View>
      </View>
    </View>
  );
};
MyAgendaItem.propTypes = {
  activities: PropTypes.array,
  date: PropTypes.any,
  color: PropTypes.shape({
    background: PropTypes.string,
    primary: PropTypes.string,
  }),
};

export default MyAgendaItem;
