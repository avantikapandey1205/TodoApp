import React, { useState } from 'react';
import { View, Text, TextInput, Button , ScrollView } from 'react-native';
import Appstyle from '../Style/Appstyle';
const DetailsScreen = ({ navigation }) => {
  const [notes, setNotes] = useState('');

  const saveNotes = () => {
    // Implement logic to save the notes (you can use AsyncStorage, Redux, etc.)
    console.log('Notes saved:', notes);
  };

  return (
    <ScrollView contentContainerStyle={Appstyle.container}>
      <Text style={Appstyle.title}></Text>
      
      {/* Your existing content */}
      {/* ... */}

      <Text style={Appstyle.notesTitle}>Notes:</Text>
      <TextInput
        style={Appstyle.notesInput}
        multiline
        numberOfLines={4}
        placeholder="Add your notes here..."
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />

      <Button title="Save Notes" onPress={saveNotes} />
    </ScrollView>
  );
};

export default DetailsScreen; 