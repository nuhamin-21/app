import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useState, useEffect} from "react";
import FocusTime from "./components/FocusTime"; 

export default function App({}) {

  const [switchScreen , setSwitchScreen] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  
  const changeScreen = () => {
    setSwitchScreen(!switchScreen);
  }
  const addTask = () => {
    const trimmed = task.trim();
    if(trimmed.length > 0)
      {
        setTasks( prev =>[...prev, trimmed]);
        setTask("");
        setSelectedTask(trimmed);
        setSwitchScreen(true);
      }
  }
  if(switchScreen && selectedTask){
      return (
      <FocusTime focusTask={selectedTask} onBack={changeScreen}/>
      )
    
  };
      
    return(
    <SafeAreaView style={styles.container}>
     <View style={styles.inputContainer}>
      <TextInput
        placeholder = "What would you like to focus ..."
        mode = {"outlined"}
        lable = "Focus"
        style = {styles.InputText} 
        value = {task}
        onChangeText = {(text)=> setTask(text)}

      />
      <TouchableOpacity style={styles.fabButton} onPress={()=>{
        addTask();
        changeScreen();
      }}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
     </View>
     <View style={styles.focusedTasks}>
      <Text style={styles.focusTitle}> Things we've focused on: </Text>
      {tasks.map((task, index) => (
        <Text key={index} style={styles.taskText}>{task}</Text>
      ))}
     <View style={{padding: 20}}>
      <Text style={{ fontSize: 18 , color: 'white', fontWeight: 'semi-bold'}}> 1, Learn react native </Text>
      <Text style={{ fontSize: 18 , color: 'white', fontWeight: 'semi-bold'}}> 2, Learn js basics </Text>
     </View>
     </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#hsla(245, 94%, 21%, 0.76)'
  },
  inputContainer:{
    flexDirection: 'row',
    padding: 20,
  },
  InputText: {
    flex: 1,
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 10,
  },
  fabText: {
    fontSize: 20,
    color: 'white',
  },
  focusedTasks: {
    marginTop: 10,
    padding: 20,
  },
  focusTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    color: 'white',
  },
  taskText: {
    fontWeight: 'semi-bold',
    fontSize: 18,
    color: 'white',
    padding: 10,
  }
})