import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
     
    },
     backgroundCover:{
    
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"000000",
        padding:16,
        
     },
     lightext:{
         color:"#fff",
         
     },
      header:{
        fontSize:50,
        fontWeight: 'bold',
      },
      header1:{
        fontSize:25

      },
      textInput :{
        alignSelf:'stretch',
        padding:10,
        fontSize:19,
        borderBottomWidth:2,
        marginVertical:8
      
      },
       lightextInput:{
        borderBottomColor:'#000000'
       },
       buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
       writeTaskWrapper: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       position: 'absolute',
       bottom: 60,
       width: '100%',
       paddingHorizontal: 20,
     },
     input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      width: 250,
      backgroundColor: '#fff',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      minHeight: 60
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
   addText: {
    fontSize: 24,
    color: '#55BCF6',
    
  },
  square: {
    backgroundColor: '#82EEFD', // Background color for the task box
    padding: 10,
    marginVertical: 15,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 380,
    flexDirection: 'row', // Added flexDirection to position buttons horizontally
    justifyContent: 'space-between', // Added justifyContent to push buttons to the right
    alignItems: 'center', // Added alignItems to center the text vertically
  },

  taskList: {
    maxHeight: '95%', // Set a maximum height for the task list if using ScrollView
  },
  size:{
    color: 'white',
    fontWeight: '600',
     fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  notesInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 60,
    width: '80%',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 62,
    marginLeft: 16,
    marginRight:25,
  },
  NoteButton:{
    fontSize: 24,
    color: '#000000',
  },
  rect: {
    backgroundColor: '#808080', // Background color for the note box
    padding: 10,
    marginVertical: 15,
    borderRadius: 15, // Adjusted borderRadius for round corners
    borderWidth: 1,
    borderColor: '#ccc',
    width: 350, // Adjusted width for a square box
    flexDirection: 'row', // Added flexDirection to position buttons horizontally
    justifyContent: 'space-between', // Added justifyContent to push buttons to the right
    alignItems: 'center',
  }
  


});