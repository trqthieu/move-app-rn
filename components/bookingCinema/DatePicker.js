import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
  const [date, setDate] = useState(new Date()); // Initial date value
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, always show the picker
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode='date' // You can change this to 'time' or 'datetime' if needed
          display='default'
          onChange={onChange}
        />
      )}
      <Text>Date: {date.toDateString()}</Text>
    </View>
  );
};

export default DatePicker;
