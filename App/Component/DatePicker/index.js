import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';

import Text from '~/Component/Text';

class Calendar extends PureComponent {
  static get defaultProps() {
    return {
      date: new Date(),
      onDateSelect: null,
      onPrevButtonPress: null,
      onNextButtonPress: null,
      weekFirstDay: 0,
      dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };
  }

  static get propTypes() {
    return {
      date: PropTypes.object,
      onDateSelect: PropTypes.func,
      onPrevButtonPress: PropTypes.func,
      onNextButtonPress: PropTypes.func,
      dayNames: PropTypes.array,
      monthNames: PropTypes.array,
      weekFirstDay: PropTypes.number,
    };
  }

  handleNextButtonPress() {
    if (this.props.onNextButtonPress !== null) {
      this.props.onNextButtonPress();
    }
  }

  handlePrevButtonPress() {
    if (this.props.onPrevButtonPress !== null) {
      this.props.onPrevButtonPress();
    }
  }

  handleDayPress(dateNumber) {
    if (this.props.onDateSelect !== null) {
      const month = this.props.date.getMonth();
      const year = this.props.date.getFullYear();
      const selectedDate = new Date(year, month, dateNumber);

      this.props.onDateSelect(selectedDate);
    }
  }

  renderDayNames() {
    const elements = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (this.props.weekFirstDay + i) % 7;

      elements.push(
        <View key={i} style={styles.dayInner}>
          <Text style={[styles.shadedText, styles.dayText]}>
            {this.props.dayNames[dayIndex]}
          </Text>
        </View>,
      );
    }

    return (
      <View style={styles.week}>
        {elements}
      </View>
    );
  }

  renderCalendarDay(index, dateNumber) {
    const weekDay = (index + this.props.weekFirstDay) % 7;
    const isWeekend = weekDay === 0 || weekDay === 6;
    const today = new Date();
    const isToday =
      this.props.date.getDate() === dateNumber &&
      this.props.date.getMonth() === today.getMonth() &&
      this.props.date.getFullYear() === today.getFullYear();

    return (
      <View key={dateNumber} style={styles.dayOuter}>
        <TouchableOpacity onPress={() => this.handleDayPress(dateNumber)}>
          <View style={[styles.dayInner, isToday ? styles.todayDayInner : {}]}>
            <Text
              style={[
                styles.dayText,
                isWeekend ? styles.dayWeekendText : {},
                isToday ? styles.todayDayText : {},
              ]}
            >
              {dateNumber}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderCalendarDayEmpty(dateNumber) {
    return (
      <View key={dateNumber} style={styles.dayOuter}>
        <View style={styles.dayInner}>
          <Text style={styles.dayText}> </Text>
        </View>
      </View>
    );
  }

  renderCalendarWeek(startDateNumber, weekOffset, daysLeft) {
    const days = [];
    const weekKey = startDateNumber;
    for (let i = 0; i < weekOffset; i++) {
      days.push(this.renderCalendarDayEmpty(-weekOffset + i));
    }

    let i = weekOffset;
    for (; i < 7 && daysLeft > 0; i++) {
      days.push(this.renderCalendarDay(i, startDateNumber++));

      daysLeft--;
    }
    for (; i < 7; i++) {
      days.push(this.renderCalendarDayEmpty(startDateNumber++));
    }

    return (
      <View key={weekKey} style={styles.week}>
        {days}
      </View>
    );
  }

  render() {
    const date = this.props.date;

    let monthFirstDayOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    ).getDay();

    monthFirstDayOfWeek =
      (monthFirstDayOfWeek - this.props.weekFirstDay + 7) % 7;

    let daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    let startDateNumber = 1;

    const weeks = [];

    if (monthFirstDayOfWeek !== 0) {
      weeks.push(
        this.renderCalendarWeek(
          startDateNumber,
          monthFirstDayOfWeek,
          daysInMonth,
        ),
      );

      daysInMonth -= (7 - monthFirstDayOfWeek) % 7;
      startDateNumber += (7 - monthFirstDayOfWeek) % 7;
    }

    while (daysInMonth > 0) {
      weeks.push(this.renderCalendarWeek(startDateNumber, 0, daysInMonth));
      startDateNumber += 7;
      daysInMonth -= 7;
    }

    return (
      <View style={[styles.calendar]}>
        {this.renderDayNames()}
        {weeks}
      </View>
    );
  }
}

export default Calendar;
