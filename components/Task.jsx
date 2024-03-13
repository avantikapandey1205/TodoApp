import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

import Appstyle from '../Style/Appstyle';
import { calculateSecondsUntilTrigger, noop } from '../utils';

const styles = StyleSheet.create({})

const PICKER_MODE = {
  date: 'date',
  time: 'time',
}

const InitialDate = new Date();

const Task = ({ item, handleLongPressTask = noop }) => {
  const [date, setDate] = useState(InitialDate);
  const [isReminderSet, setIsReminderSet] = useState(false);
  const currentItem = useRef(null);

  const onDateSet = (event) => {
    if (event.type !== 'set') {
      return;
    };

    try {
      setDate(event?.nativeEvent?.timestamp);
    } catch (error) {
      console.log({ customErr: error })
    }
    setTimeout(showTimepicker, 500);
  }

  const onTimeSet = (event) => {
    if (event.type !== 'set') {
      return;
    };

    setDate(event?.nativeEvent?.timestamp);
    setTimeout(() => {
      // schedule notification
      const seconds = calculateSecondsUntilTrigger(date?.nativeEvent?.timestamp)
      scheduleNotification(seconds, currentItem.current, () => {
        setIsReminderSet(true);
        console.log('reminder set successfully')
      }, () => {
        setIsReminderSet(false);
        console.log('reminder scheduling failed')
      });
    }, 500)
  }



  const showMode = (currentMode) => {
    let onChange = currentMode === PICKER_MODE.date ? onDateSet : onTimeSet

    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      minimumDate: InitialDate,
      timezone: 'Asia/Calcutta',
    });
  };

  const showDatepicker = () => {
    showMode(PICKER_MODE.date);
  };

  const showTimepicker = () => {
    showMode(PICKER_MODE.time);
  };


  const onSingleTaskReminderClick = (item) => {
    currentItem.current = item;
    // open date time picker
    showDatepicker()
    console.log('called')
  };

  const scheduleNotification = async (seconds, item, onSuccess = noop, onError = noop) => {
    try {
      console.log({ seconds })
      // Schedule the notification
      const res = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Reminder!',
          body: item.text,
        },
        trigger: {
          seconds
        },
      });

      console.log({ res })
      onSuccess();
    } catch (error) {
      console.log(error)
      alert('something went wrong');
      onError();
    }
  }


  return (
    <TouchableOpacity
      onLongPress={() => handleLongPressTask(item.id)}
    >
      <View style={Appstyle.square}>
        <Text>{item.text}</Text>
        <Pressable
          onPress={() => onSingleTaskReminderClick(item)}
          disabled={isReminderSet}
          hitSlop={10}
        >
          <Text>{isReminderSet ? "Set" : "Reminder"}</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

export default Task

