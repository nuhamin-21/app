import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { SystemBars } from "react-native-edge-to-edge";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function FocusTime({ focusTask, onBack }) {
    const [isRunning , setIsRunning ] = useState(false);
    const times = [10, 900, 1200];
    const [selectedTime, setSelectedTime] = useState();
    const timeFormat = (times) => {
        const minutes = Math.floor(times / 60);
        const seconds = Math.floor(times % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const showToast = () => {
        Toast.show({
            position: 'top',
            type: 'success',
            text1: `You have successfully focused on ${focusTask}`,
        })
    }

    useEffect(()=>{
            let intervalId;

            if(isRunning && selectedTime > 0){
             intervalId = setInterval(()=>{
                 setSelectedTime(prev => prev -1)
            },1000)
           }
        
           if(!isRunning || selectedTime < 0) {
            clearInterval(intervalId);
          }
           else if(selectedTime === 0){
            showToast();
            setIsRunning(false);
         }
  return () => clearInterval(intervalId);
  },[isRunning, selectedTime])

  const showSuccess = () => {
    Alert.alert(`You have successfully focused on ${focusTask}`)
  }


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.imageBackground} source={require('../assets/dreamy-cozy.jpg')} resizeMode='cover' >
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={{color: 'white'}}>Back</Text>
            </TouchableOpacity>
                <SystemBars style="light" />
            <Text style={styles.timerText}>
                {selectedTime ? timeFormat(selectedTime) : "10:00"}
            </Text>
            <Text style={styles.subTitle}> Focusing on : </Text>
            <Text style={styles.focusTask}>{focusTask}</Text>
            <View style={{height: 10, width: '100%', backgroundColor: '#5e4fe6', marginTop: 30, marginBottom: 20}}/>

            <View style={styles.timeOptions}>
                {times.map((time, index) => (
                    <TouchableOpacity key={index} style={styles.timeOptionsButton} onPress={() => setSelectedTime(time)}>
                        <Text style={styles.timeOptionsText}>{timeFormat(time)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.startFab} onPress={() => {setIsRunning(!isRunning)}}>
                <Text style={{color: 'white'}}>{isRunning ? 'Stop' : 'Start'}
                </Text>
            </TouchableOpacity>
            <Toast/>
              </ImageBackground>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252250',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
    },
    timerText: {
        fontWeight: 'bold',
        fontSize: 60,
        color: 'white',
        marginTop: 50,
    },
    subTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 50,
    },
    focusTask: {
        fontSize: 30,
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
    },
    timeOptions: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    timeOptionsButton: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
    },
    timeOptionsText: {
        fontSize: 18,
        color: 'white',
    },
    startFab: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    backButton: {
        flexDirection: 'row',
        height:50,
        width: 100,
        borderRadius: 25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',

    },
})