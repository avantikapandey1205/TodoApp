import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { noop } from '../utils';
import Appstyle from '../Style/Appstyle';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({})

const PICKER_MODE = {
  date: 'date',
  time: 'time',
}

const InitialDate = new Date();

const TaskList = ({ tasks, handleLongPressTask = noop }) => {
  const [date, setDate] = useState(new Date(0));
  const [mode, setMode] = useState(PICKER_MODE.date);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type !== 'set') {
      setShow(false);
      return;
    };

    const currentDate = selectedDate;
    console.log({ currentDate })
    setDate(currentDate);

    if (mode === PICKER_MODE.time) {
      setIsReminderSet(true);
      // schedule notification
    }

    if (mode === PICKER_MODE.date) {
      setShow(false);
      setMode(PICKER_MODE.time)
      setTimeout(() => {
        setShow(true);
      }, 100)

      return;
    }
    setShow(false)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(PICKER_MODE.date);
  };


  const onSingleTaskReminderClick = () => {
    // open date time picker
    showDatepicker()
  };


  return tasks.map((item) => (
    <TouchableOpacity
      key={item.id}
      onLongPress={() => handleLongPressTask(item.id)}
    >
      <View style={Appstyle.square}>
        <Text>{item.text}</Text>
        <Pressable
          onPress={onSingleTaskReminderClick}
          disabled={isReminderSet}
        >
          <Text>Reminder</Text>
        </Pressable>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={InitialDate}
          />
        )}
      </View>
    </TouchableOpacity>
  ));
}

export default TaskList

