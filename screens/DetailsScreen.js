import React, { useEffect, useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,ScrollView,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appstyle from '../Style/Appstyle';

const DetailsScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    // Load tasks from AsyncStorage on component mount
    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('notes');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      if (editingTaskId !== null) {
        const updatedTasks = tasks.map((item) =>
          item.id === editingTaskId ? { ...item, text: task } : item
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
        saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
      } else {
        const newTask = { id: tasks.length.toString(), text: task };
        setTasks([...tasks, newTask]);
        saveTasks([...tasks, newTask]); // Save updated tasks to AsyncStorage
      }
      setTask('');
    }
  };

  const handleLongPressTask = (taskId) => {
    Alert.alert(
      'Modify Notes',
      '',
      [
        { text: 'Edit', onPress: () => handleEditTask(taskId) },
        {
          text: 'Delete',
          onPress: () => handleDeleteTask(taskId),
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks); // Save updated tasks to AsyncStorage
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((item) => item.id === taskId);
    setEditingTaskId(taskId);
    setTask(taskToEdit.text);
  };

  return (
    <View style={Appstyle.container}>
      <ScrollView style={Appstyle.taskList}>
        {tasks.map((item) => (
          <TouchableOpacity
            key={item.id}
            onLongPress={() => handleLongPressTask(item.id)}
            activeOpacity={0.7}
          >
            <View style={Appstyle.rect}>
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={Appstyle.writeTaskWrapper}>
        <TextInput
          numberOfLines={3}
          style={Appstyle.input}
          placeholder={'Write a task'}
          onChangeText={(text) => setTask(text)}
          value={task}
          ellipsizeMode="tail"
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={Appstyle.addWrapper}>
            <Text style={Appstyle.NoteButton}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DetailsScreen;
