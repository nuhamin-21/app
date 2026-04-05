import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function FocusTime({ focusTask, onBack }) {
    const [isRunning , setIsRunning ] = useState(false);
    const times = [600, 900, 1200]; // 10, 15, 20 minutes in seconds
    const [selectedTime, setSelectedTime] = useState(null);
    const timeFormat = (times) => {
        const minutes = Math.floor(times / 60);
        const seconds = Math.floor(times % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.timerText}>
                {timeFormat ? timeFormat(times[0]) : "00:00"}
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
            <TouchableOpacity style={styles.startFab} onPress={() => {}}>
                <Text style={{color: 'white'}}>{isRunning ? "Pause" : "Start"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={{color: 'white'}}>Back</Text>
            </TouchableOpacity>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsla(245, 94%, 21%, 0.76)S',
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
        marginTop: 50,
        height:50,
        width: 100,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
})