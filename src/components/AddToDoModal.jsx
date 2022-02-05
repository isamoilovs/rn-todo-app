import react, { useState } from "react";
import { FlatList, Modal, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import TaskInput from "./TaskInput";

export default AddToDoModal = ({isModalVisible, setModalVisible, addToDo}) => {
    const [title, setTitle] = useState(null);
    const [tasks, setTasks] = useState([{id: 0, description: '', done: false}]);

    const addTask = (task) => {
        setTasks([
            ...tasks,
            {
                id: tasks.length.toString(),
                description: task.description,
                done: false
            }
        ])
    }

    const createNewTask = () => {
        setTasks([
            ...tasks,
            {
                id: tasks.length.toString(),
                description: '',
                done: false
            }
        ])
    }

    const getPrettifiedIDs = (tasks) => {
        let prettifiedTodos = [...tasks];
        prettifiedTodos.forEach((t, i) => t.id = String(i));
        return prettifiedTodos;
    }

    const removeTask = (task) => {
        let newTasks = getPrettifiedIDs(tasks.filter(t => t.id !== task.id));
        setTasks(newTasks);
    }

    const updateTask = (task) => {
        tasks.forEach((elem) => {
            if (elem.id === task.id) {
                elem.description = task.description;
                elem.done = task.done;
                return
            }
        })
    }

    const pressHandler = () => {
        setModalVisible(false);
        if(tasks[0] === undefined) {
            setTasks([{id: 0, description: '', done: false}]);
            return;
        }

        if(tasks[0].description.trim()) {
            addToDo(title, tasks);
            setTasks([{id: 0, description: '', done: false}]);
        }
        setTasks([{id: 0, description: '', done: false}]);
        setTitle(null);
    }

    return(
        <View style={styles.wrapper}>
            <Modal
                onRequestClose={() => setModalVisible(false)}
                animationType='fade'
                visible={isModalVisible}
                transparent={true}
                hardwareAccelerated={true}
            >
                <TouchableWithoutFeedback onPress={pressHandler}>
                    <View style={styles.modalOverlay}/>
                </TouchableWithoutFeedback>
                <View style={styles.modal}>
                    {(tasks.length > 1) 
                    &&
                    <TextInput
                        style={styles.input}
                        placeholder='Enter title..'
                        onChangeText={setTitle}
                        value={title}
                    />
                    }
                    <FlatList 
                        data={tasks}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <TaskInput
                                task={item}
                                updateTask={updateTask}
                                createNewTask={createNewTask}
                                addTask={addTask}
                                removeTask={removeTask}
                            />
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },

    modal: {
        alignSelf: 'center',
        width: '100%',
        minHeight: '30%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 30
    },

    input: {
        width: '90%',
        paddingVertical: 10,
        fontSize: 20,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection:"column",
        fontWeight: 'bold'
    },

    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})