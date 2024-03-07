import { useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

// no operation
const noop = () => undefined;

export const DPicker = (props) => {
    const {onDateSet = noop } = props;

    const [date, setDate] = useState(new Date(0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      onDateSet(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <SafeAreaView>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </SafeAreaView>
    );
  };