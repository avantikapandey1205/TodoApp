import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { noop } from '../utils';
import Appstyle from '../Style/Appstyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

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
  const currentItem = useRef(null);

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log(event.type)
    if (event.type !== 'set') {
      setShow(false);
      return;
    };

    setDate(selectedDate);
    console.log({ selectedDate })


    if (mode === PICKER_MODE.date) {
      setShow(false);
      setTimeout(() => {
        showMode(PICKER_MODE.time)
      }, 500)

      return;
    }

    if (mode === PICKER_MODE.time) {
      setTimeout(() => {
        // schedule notification
        scheduleNotification(selectedDate, currentItem.current, () => {
          setIsReminderSet(true);
          console.log('reminder set successfully')
        }, () => {
          setIsReminderSet(false);
          console.log('reminder scheduling failed')
        });
      }, 500)
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


  const onSingleTaskReminderClick = (item) => {
    currentItem.current = item;
    // open date time picker
    showDatepicker()
    console.log('called')
  };

  const scheduleNotification = async (triggerDate, item, onSuccess = noop, onError = noop) => {
    try {
      // Set the date and time for the notification
      // const triggerDate = new Date(triggerDate); // Example: March 10, 2024 at 8:00 AM
      console.log({triggerDate})

      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Reminder!',
          body: item.text,
        },
        trigger: triggerDate,
      });
      onSuccess();
    } catch (error) {
      console.log(error)
      alert('something went wrong');
      onError();
    }
  }


  return tasks.map((item) => (
    <TouchableOpacity
      key={item.id}
      onLongPress={() => handleLongPressTask(item.id)}
    >
      <View style={Appstyle.square}>
        <Text>{item.text}</Text>
        <Pressable
          onPress={() => onSingleTaskReminderClick(item)}
          disabled={isReminderSet}
        >
          <Text>{isReminderSet ? "Set" : "Reminder"}</Text>
        </Pressable>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            onChange={onChange}
            minimumDate={InitialDate}
            timeZoneName={'Asia/Calcutta'}
          />
        )}
      </View>
    </TouchableOpacity>
  ));
}

export default TaskList

