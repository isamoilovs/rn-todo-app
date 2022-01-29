import react, { useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";

export default AddToDoModal = ({isModalVisible, setModalVisible, addToDo}) => {

    const [task, setTask] = useState('');

    const pressHandler = () => {
        if(task.trim()) {
            addToDo(task);
            setTask('');
        }

        setModalVisible(false);
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
                <TouchableWithoutFeedback
                    onPress={pressHandler}
                >
                    <View style={styles.modalOverlay}/>
                </TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <TextInput
                        style={styles.input}
                        value={task}
                        placeholder='Create task..'
                        onChangeText={setTask}
                        // onKeyPress
                        onEndEditing={pressHandler}
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
        height: '30%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    input: {
        width: '90%',
        paddingVertical: 20,
        fontSize: 20,
        paddingHorizontal: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection:"column"
    },

    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})