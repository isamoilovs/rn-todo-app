import react from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useState } from "react/cjs/react.development";

export const AddToDo = ({ onSubmit }) => {

    const [value, setValue] = useState('');
    
    const pressHandler = () => {
        if(value.trim()) {
            onSubmit(value)
            setValue('')
        } else {
            Alert.alert('Todo has not to be empty!')
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Enter what to do'
                autoCorrect={false}
                autoCapitalize='none'/>
            <Button
                title='Add'
                style={styles.button} 
                onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    button: {
        alignItems: 'flex-end'
    },
    input: {
        width: '80%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
        padding: 10,
        fontSize: 17
    }
})