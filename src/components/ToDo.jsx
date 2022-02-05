import react from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const ToDo = ({todo, remove}) => {
    const removeToDo = () => {
        remove(todo);
    }

    return (
        <View style={styles.todo}>
            {todo.title && <Text style={styles.title}>{todo.title}</Text>}
            <View style={styles.tasksWrapper}>
                {todo.tasks.map((elem) => <Text key={elem.id} style={styles.task}>{elem.description}</Text>)}
            </View>
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding:15,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 7
    },

    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    tasksWrapper: {
        marginLeft: 50
    }
})