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

                <Button
                    title="edit"
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
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 5,
        marginBottom: 10
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '35%'
    }
})