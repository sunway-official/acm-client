import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { transformServerDate } from 'Transformer';
import { DATE_FORMAT } from 'env';
import moment from 'moment';
import styles, { customStyles } from './styles';

const MIN_DATE = transformServerDate.toLocal('1900-01-01');
const MAX_DATE = moment().format(DATE_FORMAT); // current date

const DatePickerForm = ({
  input: { value, onChange },
  containerStyle,
  ...others
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <DatePicker
        date={value}
        mode="date"
        format={DATE_FORMAT}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        showIcon={false}
        confirmBtnText="OK"
        cancelBtnText="Cancel"
        onDateChange={onChange}
        customStyles={customStyles}
        {...others}
      />
    </View>
  );
};

DatePickerForm.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  containerStyle: ViewPropTypes.style,
};

export default DatePickerForm;
