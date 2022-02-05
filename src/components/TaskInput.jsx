import react, {useEffect, useState} from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default TaskInput = ({task, createNewTask, addTask, removeTask, updateTask}) => {

    const [done, setDone] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        task.description = description;
        task.done = done;
        updateTask(task)
    }, [description, done])

    const  handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        console.log(keyValue);
        if((keyValue === 'Enter') && (description !== '')) {
            setDescription(description.trim())
            createNewTask();
            return;
        }

        if((keyValue === 'Backspace') && (description === '')) {
            removeTask(task);
        }
    };

    return(
        <View style={styles.container}>
            <Pressable
                style={styles.switch}
            />
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder='Tap enter to create new task..'
                placeholderTextColor='#878787'
                value={description}
                onKeyPress={handleKeyPress}
                onChangeText={setDescription}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },

    switch: {
        marginLeft: 40,
        alignSelf: 'center',
        width: 20,
        height: 20,
        backgroundColor: '#f0f0f0',
        borderColor: '#a0a0a0',
        borderWidth: 3,
        borderRadius: 3
    },

    input: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '70%',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 40
    }
})