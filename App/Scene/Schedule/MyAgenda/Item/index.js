import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { Text } from '~/Component';
import moment from 'moment';
import ItemDetail from './Detail';
import { DATE_FORMAT } from 'react-native-dotenv';
import styles from './styles';

class MyAgendaItem extends Component {
  constructor(props) {
    super(props);

    this._renderItemContent = this._renderItemContent.bind(this);
  }
  _renderItemContent = ({ item }) => {
    const { contentBackgroundColor } = this.props;
    return <ItemDetail {...item} backgroundColor={contentBackgroundColor} />;
  };

  render() {
    let { activities, date } = this.props;
    activities = activities.filter(item => item.active);
    const month = moment(date, DATE_FORMAT).format('MMM');
    const day = moment(date, DATE_FORMAT).format('Do');
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
            <Text style={styles.textDay} bold>
              {day}
            </Text>
            <Text style={styles.textMonth}>
              {month}
            </Text>
          </View>
          <View style={styles.contentWrapper}>
            <FlatList
              data={activities}
              keyExtractor={(item, index) => index}
              renderItem={this._renderItemContent}
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
  contentBackgroundColor: PropTypes.string,
};

export default MyAgendaItem;
