import react from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const ToDo = ({todo, remove}) => {
    const removeToDo = () => {
        remove(todo);
    }

    return (
        <View style={styles.todo}>
            <Text>{todo.title}</Text>

            <View style={styles.buttonWrapper} >
                <Button
                    onPress={removeToDo}
                    title="delete"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:15,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 7
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '35%'
    }
})